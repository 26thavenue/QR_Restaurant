import { ZodSchema } from "zod";

export const validateWithSchema = <T>(schema: ZodSchema<T>, data: unknown): { data?: T; error?: string } => {
  const result = schema.safeParse(data);
  console.log(schema);
  if (result.success) {
    return { data: result.data };
  } else {    
      const errorMessages = JSON.stringify(result.error)
    return {
      error: `message: Validation Error - ${errorMessages}`,
    };
  }
};