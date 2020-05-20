import { Handler, Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import { logger } from "../../logger";

export const handlerBoundary = (handler: Handler) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await handler(req, res, next);
    res.send(result);
  } catch (err) {
    const thrownError = err as Partial<HttpError>;
    const { name, message, stack, statusCode, error_code } = thrownError;

    // Setting expected if it's a http-error so we can filter out unexpected exceptions
    // Similar to how middy's httpErrorHandler does it: https://github.com/middyjs/middy/blob/master/src/middlewares/httpErrorHandler.js
    const expected = !!(thrownError.statusCode && thrownError.message);
    const exposed = thrownError.expose || false;

    logger.error({ name, message, exposed, stack, expected });

    // Returning Internal Server error if error is not thrown by us
    // For known errors, we send 400 and error message if error message is to be exposed
    switch (true) {
      case expected && exposed:
        res.status(statusCode || 400);
        res.send({ error_code, message });
        break;
      case expected && !exposed:
        res.status(statusCode || 400);
        res.send();
        break;
      default:
        res.status(statusCode || 500);
        res.send({
          error_code: "SERVER_ERROR",
          message: "Unknown error"
        });
    }
  }
};
