import { Request } from "express";
import { handlerBoundary } from "../handlerBoundary";
import { run, all } from "../../database";
import { RideEntry } from "../../types";

export const createRide = async (req: Request) => {
  const { startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle } = req.body;

  const { lastID } = await run(
    `INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (${startLat}, ${startLong}, ${endLat}, ${endLong}, "${riderName}", "${driverName}", "${driverVehicle}")`
  );

  const rows = all<RideEntry[]>("SELECT * FROM Rides WHERE rideID = ?", lastID);
  return rows;
};

export const createRideHandler = handlerBoundary(createRide);
