import { verbose } from "sqlite3";
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
const migrate = () =>
  new Promise((resolve, reject) =>
    db.run(DATABASE_SCHEMA, (result: any, error: any) => {
      if (error) return reject(error);
      resolve(result);
    })
  );

export const initializeDb = async () => {
  await serialize();
  await migrate();
  return db;
};
