import { verbose, RunResult } from "sqlite3";

const sqlite3 = verbose();

const db = new sqlite3.Database(":memory:");

const DATABASE_SCHEMA = `
  CREATE TABLE Rides(
    rideID INTEGER PRIMARY KEY AUTOINCREMENT,
    startLat DECIMAL NOT NULL,
    startLong DECIMAL NOT NULL,
    endLat DECIMAL NOT NULL,
    endLong DECIMAL NOT NULL,
    riderName TEXT NOT NULL,
    driverName TEXT NOT NULL,
    driverVehicle TEXT NOT NULL,
    created DATETIME default CURRENT_TIMESTAMP
  )
`;

const serialize = (): Promise<void> => new Promise(resolve => db.serialize(resolve));

export const all = (queryString: string, params: any = []): Promise<any> => {
  return new Promise((resolve, reject) =>
    db.all(queryString, params, (error: Error, rows: any) => {
      if (error) return reject(error);
      resolve(rows);
    })
  );
};

export const run = (queryString: string, params: any = []): Promise<RunResult> => {
  return new Promise((resolve, reject) =>
    db.run(queryString, params, function runCallback(error: Error) {
      if (error) return reject(error);
      resolve(this);
    })
  );
};

export const initializeDb = async () => {
  await serialize();
  await run(DATABASE_SCHEMA);
  return db;
};
