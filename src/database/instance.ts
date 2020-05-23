import sqlite3, { verbose } from "sqlite3";

verbose();

export const db = new sqlite3.Database(":memory:");
