import createHttpError from "http-errors";

export const throwValidationError = (message: string) => {
  throw createHttpError(400, message, { error_code: "VALIDATION_ERROR" });
};
