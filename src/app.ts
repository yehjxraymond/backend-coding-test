import express, { Express } from "express";
import { json } from "body-parser";

import { healthCheckHandler } from "./handlers/healthcheck";
import { createRideHandler } from "./handlers/createRide";
import { getRideHandler } from "./handlers/getRides";
import { getRideByIdHandler } from "./handlers/getRideById";

const app = express();
const jsonParser = json();

export default (): Express => {
  app.get("/health", healthCheckHandler);
  app.post("/rides", jsonParser, createRideHandler);
  app.get("/rides", getRideHandler);
  app.get("/rides/:id", getRideByIdHandler);
  return app;
};
