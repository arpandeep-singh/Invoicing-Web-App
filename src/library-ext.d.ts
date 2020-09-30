import { IUser } from "./app/services/customer";

declare module 'express' {
  export interface Request {
        user?: IUser;
    }
}