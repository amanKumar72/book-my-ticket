import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import Config from "@/common/config/config";

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, Config.JWT.secret);
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, Config.JWT.secret) as JwtPayload;
}
