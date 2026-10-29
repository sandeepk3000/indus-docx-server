import type { CreateInput } from "@prisma/orm-postgres/orm-client";
import type { Contract } from "../../prisma/contract";
import type {
  CreateUserInput,
  LoginUserInput

} from "./users.validation";
import type { JwtPayload } from "jsonwebtoken";

export type {
  CreateUserInput,
  
LoginUserInput
};

export type UserCreateData =CreateInput<Contract,"User","public">;
export interface AccessTokenPayload extends JwtPayload {
  id: string;
  email:string;
}
export interface RefreshTokenPayload extends JwtPayload {
  id: string;
}