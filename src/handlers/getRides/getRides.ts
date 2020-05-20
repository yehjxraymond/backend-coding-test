import { Request } from "express";
import createHttpError from "http-errors";
import { handlerBoundary } from "../handlerBoundary";
import { all } from "../../database";

const PAGE_SIZE = 20;

export const getRides = async (request: Request) => {
  if (request.query.page && isNaN(Number(request.query.page)))
  throw createHttpError(400, "page must be a number", { error_code: "VALIDATION_ERROR" });
  const page = Number(request.query.page) || 0;
  if (page < 0) throw createHttpError(400, "page must be >= 0", { error_code: "VALIDATION_ERROR" });
  const rides = await all(`SELECT * FROM Rides LIMIT ${PAGE_SIZE} OFFSET ?`, [page * PAGE_SIZE]);
  if (rides.length === 0)
    throw createHttpError(404, "Could not find any rides", { error_code: "RIDES_NOT_FOUND_ERROR" });
  return rides;
};

export const getRidesHandler = handlerBoundary(getRides);
