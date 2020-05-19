import { initializeDb } from "./database";
import app from "./app";

const port = 8010;

const start = async () => {
  const db = await initializeDb();
  await app(db).listen(port);
  console.log(`App started and listening on port ${port}`);
};

start();
