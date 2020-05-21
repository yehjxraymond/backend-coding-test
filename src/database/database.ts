import { RunResult } from "sqlite3";
import { db } from "./instance";
import { CREATE_TABLE_QUERY } from "./queries";

export function all<T>(queryString: string, params: any = []): Promise<T> {
  return new Promise((resolve, reject) =>
    db.all(queryString, params, (error: Error, rows: any) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(rows);
    })
  );
}

export const run = (queryString: string, params: any = []): Promise<RunResult> => {
  return new Promise((resolve, reject) =>
    db.run(queryString, params, function runCallback(error: Error) {
      if (error) {
        reject(error);
        return;
      }
      resolve(this);
    })
  );
};

const serialize = (): Promise<void> => new Promise(resolve => db.serialize(resolve));

export const initializeDb = async () => {
  await serialize();
  await run(CREATE_TABLE_QUERY);
};
