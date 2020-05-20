import { Request } from "express";
import createHttpError from "http-errors";
import { handlerBoundary } from "../handlerBoundary";
import { all } from "../../database";

const PAGE_SIZE = 20;

export const getRide = async (request: Request) => {
  const page = Number(request.query.page) || 0;
  if (isNaN(page) || page < 0) throw createHttpError(400, "page must be a number", { error_code: "VALIDATION_ERROR" });
  const rides = await all(`SELECT * FROM Rides LIMIT ${PAGE_SIZE} OFFSET ?`, [page * PAGE_SIZE]);
  if (rides.length === 0)
    throw createHttpError(404, "Could not find any rides", { error_code: "RIDES_NOT_FOUND_ERROR" });
  return rides;
};

export const getRideHandler = handlerBoundary(getRide);
