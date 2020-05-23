import { initializeDb } from "./database";
import app from "./app";
import { logger } from "./logger";
import { port } from "./config";

const start = async () => {
  await initializeDb();
  await app().listen(port);
  logger.info(`App started and listening on port ${port}`);
};

start();
