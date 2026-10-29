import { HTTP_STATUS } from "../../constants/http-status";
import { MESSAGES } from "../../constants/messages";
import { userRepository } from "./users.repository";
import type {
  LoginUserInput,
  UserCreateData,

} from "./users.types";

export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class UserService {
  async create(data: UserCreateData) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      throw new AppError(MESSAGES.ERROR.EMAIL_ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
    }

    return userRepository.create(data);
  }

  async findAll() {
    return userRepository.findMany();
  }

  async findByEmail(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    return user;
  }
    async findById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    return user;
  }
 
  async loginByEmailAndPassword({ email, refreshToken }: LoginUserInput) {
    const userExist = await userRepository.findByEmail(email);

    if (!userExist) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    const userIs = await userRepository.loginByEmailAndPassword({email,refreshToken})
    if (!userIs) {
      throw new AppError("Invalid login credentials", HTTP_STATUS.UNAUTHORIZED);
    }

    return userIs
  }

}

export const userService = new UserService();