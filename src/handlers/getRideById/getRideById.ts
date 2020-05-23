import createHttpError from "http-errors";
import { Request } from "express";
import Joi, { assert } from "@hapi/joi";
import { handlerBoundary } from "../handlerBoundary";
import { all } from "../../database";
import { RideEntry } from "../../types";

/**
 * @swagger
 *
 * /rides/{id}:
 *   get:
 *     description: Get ride by ride ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Ride ID
 *     responses:
 *       '200':
 *         description: success
 */
export const getRideById = async (req: Request) => {
  const { id } = req.params;
  assert(
    id,
    Joi.number()
      .required()
      .min(1)
  );
  const rides = await all<RideEntry[]>("SELECT * FROM Rides WHERE rideID=?", [id]);
  if (rides.length === 0)
    throw createHttpError(404, "Could not find any rides", { error_code: "RIDES_NOT_FOUND_ERROR" });
  return rides;
};

export const getRideByIdHandler = handlerBoundary(getRideById);
