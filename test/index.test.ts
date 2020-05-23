import request from "supertest";
import { expect } from "chai";
import { pick } from "lodash";
// import sinon, { stub } from "sinon";
// import { logger } from "../src/logger";
import { initializeDb, flushDb } from "../src/database";
import app from "../src/app";

const express = app();

const sampleEntry = {
  startLat: 20,
  endLat: 30,
  startLong: 100,
  endLong: -110,
  riderName: "foo",
  driverName: "bar",
  driverVehicle: "cow"
};

const insertRecord = async () => {
  let id;
  await request(express)
    .post("/rides")
    .send(sampleEntry)
    .expect("Content-Type", /application\/json/)
    .expect(200)
    .expect(res => {
      const inserted = res.body[0];
      id = inserted.rideID;
    });
  return id;
};

describe("API tests", () => {
  before(async () => {
    await initializeDb();
    // stub(logger); // Silence logger
  });
  // after(() => {
  //   sinon.restore();
  // });
  beforeEach(async () => {
    await flushDb();
  });

  describe("GET /health", () => {
    it("should return health", async () => {
      await request(express)
        .get("/health")
        .expect("Content-Type", /text/)
        .expect(200);
    });
  });

  describe("GET /rides", () => {
    it("should return error if there are no rides", async () => {
      await request(express)
        .get("/rides")
        .expect("Content-Type", /application\/json/)
        .expect(404)
        .expect(res => {
          expect(res.body).deep.equal({
            error_code: "RIDES_NOT_FOUND_ERROR",
            message: "Could not find any rides"
          });
        });
    });
    it("should return rides", async () => {
      await insertRecord();
      await insertRecord();
      await request(express)
        .get("/rides")
        .expect("Content-Type", /application\/json/)
        .expect(200)
        .expect(res => {
          const { body } = res;
          expect(body.length).equal(2);
        });
    });
    it("should have pagination working", async () => {
      const insertionDeferred = new Array(45).fill(undefined).map(insertRecord);
      await Promise.all(insertionDeferred);
      await request(express)
        .get("/rides")
        .expect("Content-Type", /application\/json/)
        .expect(200)
        .expect(res => {
          const { body } = res;
          expect(body.length).equal(20);
        });
      await request(express)
        .get("/rides?page=2")
        .expect("Content-Type", /application\/json/)
        .expect(200)
        .expect(res => {
          const { body } = res;
          expect(body.length).equal(5);
        });
    });
    xit("should not be vulnerable to SQL injection (page)", () => {});
  });

  describe("GET /rides/{id}", () => {
    it("should fetch ride by it's ID", async () => {
      let id;
      await request(express)
        .post("/rides")
        .send({
          startLat: 25,
          endLat: 35,
          startLong: 105,
          endLong: -115,
          riderName: "cow",
          driverName: "foo",
          driverVehicle: "bar"
        })
        .expect("Content-Type", /application\/json/)
        .expect(200)
        .expect(res => {
          const inserted = res.body[0];
          id = inserted.rideID;
        });
      await request(express)
        .get(`/rides/${id}`)
        .expect("Content-Type", /application\/json/)
        .expect(200)
        .expect(res => {
          const inserted = res.body[0];
          const insertedSubset = pick(
            inserted,
            "startLat",
            "endLat",
            "startLong",
            "endLong",
            "riderName",
            "driverName",
            "driverVehicle"
          );
          expect(insertedSubset).deep.equal({
            startLat: 25,
            endLat: 35,
            startLong: 105,
            endLong: -115,
            riderName: "cow",
            driverName: "foo",
            driverVehicle: "bar"
          });
        });
    });
    it("should return error when not found", async () => {
      await request(express)
        .get(`/rides/9999`)
        .expect("Content-Type", /application\/json/)
        .expect(404)
        .expect(res => {
          expect(res.body).deep.equal({
            error_code: "RIDES_NOT_FOUND_ERROR",
            message: "Could not find any rides"
          });
        });
    });
    it("should not be vulnerable to SQL injection ({id})", async () => {
      // SELECT * FROM Rides WHERE rideID=1 or 1=1
      const offendingQuery = "1 or 1=1";
      await insertRecord();
      await insertRecord();
      await request(express)
        .get(`/rides/${offendingQuery}`)
        .expect("Content-Type", /application\/json/)
        .expect(res => {
          expect(res.body).deep.equal({ error_code: "SERVER_ERROR" });
        })
        .expect(500);
    });
  });

  describe("POST /rides", () => {
    it("should return error when malformed", async () => {
      await request(express)
        .post("/rides")
        .send({ sampleEntry, startLat: "foobar" })
        .expect("Content-Type", /application\/json/)
        .expect(400)
        .expect(res => {
          expect(res.body).deep.equal({
            error_code: "VALIDATION_ERROR",
            message: '"startLat" must be a number'
          });
        });
    });
    it.only("should not be vulnerable to SQL injection (body)", async () => {
      // INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName,
      // driverVehicle) VALUES (0, 0, 0, 0, "a", "a", "a"), (1, 1, 1, 1, "b", "b", "b");

      const injection = {
        ...sampleEntry,
        driverVehicle: `a"), (1, 1, 1, 1, "b", "b", "b`
      };
      await request(express)
        .post("/rides")
        .send(injection)
        .expect("Content-Type", /application\/json/);
      await request(express)
        .get("/rides")
        .expect("Content-Type", /application\/json/)
        .expect(200)
        .expect(res => {
          const { body } = res;
          expect(body.length).equal(1);
        });
    });
    it("should create a record successfully", async () => {
      await request(express)
        .post("/rides")
        .send(sampleEntry)
        .expect("Content-Type", /application\/json/)
        .expect(200)
        .expect(res => {
          const inserted = res.body[0];
          const insertedSubset = pick(
            inserted,
            "startLat",
            "endLat",
            "startLong",
            "endLong",
            "riderName",
            "driverName",
            "driverVehicle"
          );
          expect(insertedSubset).deep.equal(sampleEntry);
          expect(typeof inserted.rideID).equal("number");
          expect(inserted.created).not.undefined;
        });
    });
  });
});
