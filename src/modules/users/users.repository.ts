import { omit } from "zod/mini";
import { db } from "../../prisma/db";
import type {
  LoginUserInput,
  UserCreateData,
} from "./users.types";

const Users = db.orm.public.User;

export class UserRepository {
  create(data: UserCreateData) {
    return Users.create(data);
  }
  findMany() {
    return Users.all();
  }
  findByEmail(email: string) {
    return Users.first({ email });
  }
   findById(id: string) {
    return Users.first({ id });
  }
  findBySubject(sub:string){
    return Users.first({authSubject:sub})
  }
  loginByEmailAndPassword({email,refreshToken}:LoginUserInput){
    return Users.where({email}).update({refreshToken:refreshToken})
  }
}

export const userRepository = new UserRepository();