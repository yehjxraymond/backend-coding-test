import { initializeDb } from "./database";
import app from "./app";

const port = 8010;

const start = async () => {
  await initializeDb();
  await app().listen(port);
  console.log(`App started and listening on port ${port}`);
};

start();
