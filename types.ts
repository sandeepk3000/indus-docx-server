import { z } from "zod";
import type { UserCreateData } from "./src/modules/users/users.types";

export type THttpResponse = {
    success:boolean;
    statusCode:number;
    request:{
        ip?:string| null
        method:string;
        url:string;
    }
    message:string;
    data:unknown
}
export type THttpError = {
    success:boolean;
    statusCode:number;
    request:{
        ip?:string| null
        method:string;
        url:string;
    }
    message:string;
    data:unknown
    trace?:object| null
}



export const commonQuerySchema = z.object({
  search: z.string().trim().min(1).optional(),

  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  sortBy: z.string().optional(),

  order: z.enum(["asc", "desc"]).default("desc"),
});

export type CommonQuery = z.output<typeof commonQuerySchema>;

export function buildPagination(limit:number,page:number) {
  return {
    offset: (page - 1) * limit,
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: UserCreateData;
    }
  }
}
export type UserRole = "ADMIN" | "INSTRUCTOR" | "STUDENT";
