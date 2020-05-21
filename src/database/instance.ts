import { verbose } from "sqlite3";

const sqlite3 = verbose();

export const db = new sqlite3.Database(":memory:");
