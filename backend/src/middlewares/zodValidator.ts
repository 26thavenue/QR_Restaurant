import { ZodSchema } from "zod";

export const validateWithSchema = <T>(schema: ZodSchema<T>, data: unknown): { data?: T; error?: string } => {
  const result = schema.safeParse(data);
  if (result.success) {
    return { data: result.data };
  } else {
    return {
      error: `Validation Error: ${result.error.issues.map(issue => issue.message).join(", ")}`,
    };
  }
};