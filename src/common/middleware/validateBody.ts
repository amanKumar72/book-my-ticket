import ApiError from "@/common/utils/apiError";
import type { Request, Response, NextFunction } from "express";

const validateBody = (Dtoclass: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const {errors, value} = Dtoclass.validate(req.body)
        console.log('errors',errors)
        if(errors){
            throw ApiError.badRequest("Validation failed", errors)
        }
        req.body = value
        next()
    }
}


export default validateBody
