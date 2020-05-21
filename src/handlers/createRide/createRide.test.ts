import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon, { stub, SinonStubbedInstance } from "sinon";
import * as database from "../../database";
import { createRide } from "./createRide";

use(chaiAsPromised);

const validInput = {
  startLat: "20",
  endLat: "30",
  startLong: "100",
  endLong: "-110",
  riderName: "foo",
  driverName: "bar",
  driverVehicle: "cow"
};

const rideEntry = {
  ...validInput,
  rideID: 1,
  created: "2020-05-21 12:46:08"
};

describe("createRide", () => {
  let db: SinonStubbedInstance<typeof database>;
  before(() => {
    db = stub(database);
  });
  after(() => {
    sinon.restore();
  });
  it("should throw for incorrect ride inputs", async () => {
    const res = createRide({ body: { ...validInput, startLat: 1337 } } as any);
    await expect(res).rejected;
  });

  it("should insert the ride record and return it", async () => {
    db.run.resolves({ lastID: 1337 } as any);
    db.all.resolves([rideEntry]);
    const res = await createRide({ body: validInput } as any);
    expect(db.all.args[0]).deep.equal(["SELECT * FROM Rides WHERE rideID = ?", 1337]);
    expect(db.run.args[0]).deep.equal([
      "INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [20, 100, 30, -110, "foo", "bar", "cow"]
    ]);
    expect(res).deep.equal([rideEntry]);
  });
});
