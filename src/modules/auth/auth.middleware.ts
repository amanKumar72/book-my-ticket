import ApiError from "@/common/utils/apiError"
import { verifyToken } from "@/common/utils/jwt"
import type { Request, Response, NextFunction } from "express"

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1]
    if (!token) {
        return ApiError.unauthorized('Token is missing')
    }
    const payload = verifyToken(token)
    if (!payload) {
        return ApiError.unauthorized('Token is invalid')
    }

    req.user = payload as {
        userId: number,
        email?: string,
        role?: string,
    }

    next()
}