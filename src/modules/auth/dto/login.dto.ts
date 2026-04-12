import BaseDto from "@/common/dto/baseDto";
import { z } from "zod";

const userLoginSchema = z.object({
    email: z.email(),
    password: z.string().regex(/^[a-zA-Z0-9_]{6,}$/),
})


class LoginDto extends BaseDto {
    static override schema = userLoginSchema;
}

export type ILogin = z.infer<typeof userLoginSchema>;
export default LoginDto