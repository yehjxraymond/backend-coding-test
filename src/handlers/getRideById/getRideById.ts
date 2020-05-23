import createHttpError from "http-errors";
import { Request } from "express";
import { handlerBoundary } from "../handlerBoundary";
import { all } from "../../database";
import { RideEntry } from "../../types";

export const getRideById = async (req: Request) => {
  const { id } = req.params;
  const rides = await all<RideEntry[]>(`SELECT * FROM Rides WHERE rideID=${id}`);
  if (rides.length === 0)
    throw createHttpError(404, "Could not find any rides", { error_code: "RIDES_NOT_FOUND_ERROR" });
  return rides;
};

export const getRideByIdHandler = handlerBoundary(getRideById);
