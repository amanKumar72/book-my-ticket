import BaseDto from "@/common/dto/baseDto";
import { z } from "zod";

const registerSchema = z.object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required').optional(),
        phone: z.string().min(1, 'Phone is required'),
        role: z.enum(['USER', 'ADMIN']).default('USER').optional(),
        email: z.email().min(1, 'Email is required'),
        password: z.string().regex(/^[a-zA-Z0-9_]{6,}$/, 'Password must be at least 6 characters long'),
    })

class RegisterDto extends BaseDto {
    static override schema = registerSchema
}

export type IUser = z.infer<typeof registerSchema>

export default RegisterDto