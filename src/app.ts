import { Database } from "sqlite3";
import express, { Express } from "express";
import { json } from "body-parser";

const app = express();
const jsonParser = json();

export default (db: Database): Express => {
  app.get("/health", (_req, res) => res.send("Healthy"));

  app.post("/rides", jsonParser, (req, res) => {
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;

    if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
      res.send({
        error_code: "VALIDATION_ERROR",
        message: "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
      });
      return;
    }

    if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
      res.send({
        error_code: "VALIDATION_ERROR",
        message: "End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
      });
      return;
    }

    if (typeof riderName !== "string" || riderName.length < 1) {
      res.send({
        error_code: "VALIDATION_ERROR",
        message: "Rider name must be a non empty string"
      });
      return;
    }

    if (typeof driverName !== "string" || driverName.length < 1) {
      res.send({
        error_code: "VALIDATION_ERROR",
        message: "Rider name must be a non empty string"
      });
      return;
    }

    if (typeof driverVehicle !== "string" || driverVehicle.length < 1) {
      res.send({
        error_code: "VALIDATION_ERROR",
        message: "Rider name must be a non empty string"
      });
      return;
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

    db.run(
      "INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)",
      values,
      function(err) {
        if (err) {
          res.send({
            error_code: "SERVER_ERROR",
            message: "Unknown error"
          });
          return;
        }

        db.all("SELECT * FROM Rides WHERE rideID = ?", this.lastID, function(err, rows) {
          if (err) {
            res.send({
              error_code: "SERVER_ERROR",
              message: "Unknown error"
            });
            return;
          }

          res.send(rows);
        });
      }
    );
  });

  app.get("/rides", (_req, res) => {
    db.all("SELECT * FROM Rides", function(err, rows) {
      if (err) {
        res.send({
          error_code: "SERVER_ERROR",
          message: "Unknown error"
        });
        return;
      }

      if (rows.length === 0) {
        res.send({
          error_code: "RIDES_NOT_FOUND_ERROR",
          message: "Could not find any rides"
        });
        return;
      }

      res.send(rows);
    });
  });

  app.get("/rides/:id", (req, res) => {
    db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, function(err, rows) {
      if (err) {
        res.send({
          error_code: "SERVER_ERROR",
          message: "Unknown error"
        });
        return;
      }

      if (rows.length === 0) {
        res.send({
          error_code: "RIDES_NOT_FOUND_ERROR",
          message: "Could not find any rides"
        });
        return;
      }

      res.send(rows);
    });
  });

  return app;
};
