import { handlerBoundary } from "../handlerBoundary";
import createHttpError from "http-errors";
import { all } from "../../database";
import { Request } from "express";

export const getRideById = async (req: Request) => {
  const rides = await all("SELECT * FROM Rides WHERE rideID=?", [req.params.id]);
  if (rides.length === 0)
    throw createHttpError(404, "Could not find any rides", { error_code: "RIDES_NOT_FOUND_ERROR" });
  return rides;
};

export const getRideByIdHandler = handlerBoundary(getRideById);
