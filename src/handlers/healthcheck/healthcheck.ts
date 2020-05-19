import { handlerBoundary } from "../handlerBoundary";
import createHttpError from "http-errors";

export const healthCheck = () => {
  throw createHttpError(
    400,
    "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively",
    { error_code: "VALIDATION_ERROR" }
  );
};
export const healthCheckHandler = handlerBoundary(healthCheck);
