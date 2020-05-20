import createHttpError from "http-errors";
import { handlerBoundary } from "../handlerBoundary";
import { all } from "../../database";

export const getRide = async () => {
  const rides = await all("SELECT * FROM Rides");
  if (rides.length === 0)
    throw createHttpError(404, "Could not find any rides", { error_code: "RIDES_NOT_FOUND_ERROR" });
  return rides;
};

export const getRideHandler = handlerBoundary(getRide);
