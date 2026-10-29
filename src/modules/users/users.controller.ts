import type { Request, Response, NextFunction } from "express";
import {
  createUserSchema,
} from "./users.validation";
import { v4 as uuidv4 } from 'uuid';



import { userService } from "./users.service";
import { HTTP_STATUS } from "../../constants/http-status";
import { MESSAGES } from "../../constants/messages";
import { ApiError } from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import generateAccessToken from "../../utils/generateAccessToken";
import generateRefreshToken from "../../utils/generateRefreshToken";

async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    console.log("create")
    const result = createUserSchema.safeParse({ ...req.body, id: uuidv4() });

    if (!result.success) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(
        new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          MESSAGES.ERROR.BAD_REQUEST,
          result.error.issues
        ));
    }
    // result.data = validated and transformed output
    const user = await userService.create(result.data);
    return res.status(HTTP_STATUS.CREATED).json(
      new ApiResponse(
        req,
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.CREATED,
        user,
        true
      )
    )
  } catch (error) {
    next(error);
  }
}

async function getUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const email = req.params.email;
    if (typeof email !== "string") {
      return next(
        new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          MESSAGES.ERROR.BAD_REQUEST,
        ),
      );
    }

    const user = await userService.findByEmail(email);
    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        req,
        res,
        HTTP_STATUS.OK,
        "User retrieved successfully",
        user,
        true,
      ),
    );
  } catch (error) {
    next(error);
  }
}
async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await userService.findAll();
    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        req,
        res,
        HTTP_STATUS.OK,
        "Users retrieved successfully",
        users,
        true,
      ),
    );
  } catch (error) {
    next(error);
  }
}

const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // authenticate middleware pehle token verify karega
    const { email, password } = req.body

    if ([email, password].some((value) => value.trim() === "")) {
      throw new ApiError(404, "All fiels is required")
    }

    const user = await userService.findByEmail(email)

    const accessToken = await generateAccessToken({ email: user.email, id: user.id })
    const refreshToken = await generateRefreshToken({ id: user.id })


    const loggedUser = await userService.loginByEmailAndPassword({ email, refreshToken })
    const options = {
      httpOnly: true,
      secure: true
    }
    res.status(HTTP_STATUS.OK)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          req,
          res,
          HTTP_STATUS.CREATED,
          "User logged successfully",
          { user: loggedUser, refreshToken, accessToken },
          true) // not git
      )
  } catch (error) {
    next(error);
  }
};

export {
  createUser,
  getUser,
  getUsers,
  login
}

