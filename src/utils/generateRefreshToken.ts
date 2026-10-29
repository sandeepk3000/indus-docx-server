import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import type { AccessTokenPayload, RefreshTokenPayload } from "../modules/users/users.types";

const generateRefreshToken =async (payload: RefreshTokenPayload)=> {
    const secret = process.env.REFRESH_TOKEN_SECRET;
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

export default generateRefreshToken;



