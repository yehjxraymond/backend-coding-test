import { Request } from "express";
import createHttpError from "http-errors";
import { handlerBoundary } from "../handlerBoundary";
import { run, all } from "../../database";

export const createRide = async (req: Request) => {
  const startLatitude = Number(req.body.start_lat);
  const startLongitude = Number(req.body.start_long);
  const endLatitude = Number(req.body.end_lat);
  const endLongitude = Number(req.body.end_long);
  const riderName = req.body.rider_name;
  const driverName = req.body.driver_name;
  const driverVehicle = req.body.driver_vehicle;

  if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
    throw createHttpError(
      400,
      "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively",
      { error_code: "VALIDATION_ERROR" }
    );
  }

  if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
    throw createHttpError(
      400,
      "End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively",
      { error_code: "VALIDATION_ERROR" }
    );
  }

  if (typeof riderName !== "string" || riderName.length < 1) {
    throw createHttpError(400, "Rider name must be a non empty string", { error_code: "VALIDATION_ERROR" });
  }

  if (typeof driverName !== "string" || driverName.length < 1) {
    throw createHttpError(400, "Driver name must be a non empty string", { error_code: "VALIDATION_ERROR" });
  }

  if (typeof driverVehicle !== "string" || driverVehicle.length < 1) {
    throw createHttpError(400, "Driver Vehicle name must be a non empty string", { error_code: "VALIDATION_ERROR" });
  }

  const values = [
    req.body.start_lat,
    req.body.start_long,
    req.body.end_lat,
    req.body.end_long,
    req.body.rider_name,
    req.body.driver_name,
    req.body.driver_vehicle
  ];

  const { lastID } = await run(
    "INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)",
    values
  );
  const rows = all("SELECT * FROM Rides WHERE rideID = ?", lastID);
  return rows;
};

export const createRideHandler = handlerBoundary(createRide);
