import request from "supertest";
import { initializeDb } from "../src/database";
import app from "../src/app";

const express = app();

describe("API tests", () => {
  before(async () => {
    await initializeDb();
  });

  describe("GET /health", () => {
    it("should return health", async () => {
      await request(express)
        .get("/health")
        .expect("Content-Type", /text/)
        .expect(200);
    });
  });
});
