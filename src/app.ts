import express, { Express } from "express";
import { json } from "body-parser";
import cors from "cors";
import helmet from "helmet";

import { corsOrigin } from "./config";
import { healthCheckHandler } from "./handlers/healthcheck";
import { createRideHandler } from "./handlers/createRide";
import { getRidesHandler } from "./handlers/getRides";
import { getRideByIdHandler } from "./handlers/getRideById";

const app = express();
const jsonParser = json();

const corsOptions = {
  origin: corsOrigin,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(helmet());

app.options("*", cors()); // For web client preflight
app.get("/health", healthCheckHandler);
app.post("/rides", jsonParser, createRideHandler);
app.get("/rides", getRidesHandler);
app.get("/rides/:id", getRideByIdHandler);

export default (): Express => {
  return app;
};
