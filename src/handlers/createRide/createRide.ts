import { Request } from "express";
import { handlerBoundary } from "../handlerBoundary";
import { run, all } from "../../database";
import { validateRideInput } from "./validate";

export const createRide = async (req: Request) => {
  const { start_lat, start_long, end_lat, end_long, rider_name, driver_name, driver_vehicle } = validateRideInput(
    req.body
  );

  const values = [start_lat, start_long, end_lat, end_long, rider_name, driver_name, driver_vehicle];

  const { lastID } = await run(
    "INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)",
    values
  );
  const rows = all("SELECT * FROM Rides WHERE rideID = ?", lastID);
  return rows;
};

export const createRideHandler = handlerBoundary(createRide);
