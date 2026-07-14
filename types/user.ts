import { User as AuthUser } from "firebase/auth";

export type Users = Pick<
  AuthUser,
  "displayName" | "email" | "photoURL" | "uid"
>;
