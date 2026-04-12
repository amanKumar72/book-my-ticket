import { z } from "zod";
import type { ZodObject} from "zod";

class BaseDto {
    static schema: ZodObject = z.object({});

    static validate(this: typeof BaseDto & { schema: ZodObject }, data: unknown) {
        const result = this.schema.safeParse(data);
        // console.log("result", result)
        if (!result.success) {
            const errors = result.error.issues.map((issue) => `${issue.message} at ${issue.path}`);
            return { errors, value: null };
        }
        return { errors: null, value: result.data };
    }
}

export default BaseDto