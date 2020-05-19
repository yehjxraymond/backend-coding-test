import { Database } from "sqlite3";
import express, { Express } from "express";
import { json } from "body-parser";

import { healthCheckHandler } from "./handlers/healthcheck";
import { createRideHandler } from "./handlers/createRide";

const app = express();
const jsonParser = json();

export default (db: Database): Express => {
  app.get("/health", healthCheckHandler);
  app.post("/rides", jsonParser, createRideHandler);

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
