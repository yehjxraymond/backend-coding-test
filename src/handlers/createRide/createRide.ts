import { Request } from "express";
import { handlerBoundary } from "../handlerBoundary";
import { run, all } from "../../database";
import { validateRideInput } from "./validate";
import { RideEntry } from "../../types";

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
