import { Request } from "express";

declare global {
  namespace Express {
    interface User {
      userId: number; // adjust based on your user model
      email?: string;
      role?: string;
    }

    interface Request {
      user?: User;
    }
  }
}