import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import type { AccessTokenPayload } from "../modules/users/users.types";

const generateAccessToken = async (payload: AccessTokenPayload) => {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const expiry = "15m"

    if (!secret) {
        throw new Error("ACCESS_TOKEN_SECRET is not configured");
    }
    if (!expiry) {
        throw new Error("dadf")
    }
    const options: SignOptions = {
        expiresIn: expiry,
    };
   const token = await jwt.sign(payload, secret, options);
    return token
};
export default generateAccessToken;



