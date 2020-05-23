import { Request } from "express";
import { handlerBoundary } from "../handlerBoundary";
import { run, all } from "../../database";
import { validateRideInput } from "./validate";
import { RideEntry } from "../../types";

/**
 * @swagger
 * /rides:
 *   post:
 *     description: Create new ride
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Ride
 *         description: Ride information
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *           startLat:
 *             type: integer
 *           startLong:
 *             type: integer
 *           endLat:
 *             type: integer
 *           endLong:
 *             type: integer
 *           riderName:
 *             type: string
 *           driverName:
 *             type: string
 *           driverVehicle:
 *             type: string
 *     responses:
 *       200:
 *         description: success
 */
export const createRide = async (req: Request) => {
  const { startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle } = validateRideInput(req.body);

  const values = [startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle];

  const { lastID } = await run(
    "INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)",
    values
  );
  const rows = all<RideEntry[]>("SELECT * FROM Rides WHERE rideID = ?", lastID);
  return rows;
};

export const createRideHandler = handlerBoundary(createRide);
