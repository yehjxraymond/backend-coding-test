import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon, { stub, SinonStubbedInstance } from "sinon";
import * as database from "../../database";
import { getRideById } from "./getRideById";

use(chaiAsPromised);

const ride = {
  startLat: "20",
  endLat: "30",
  startLong: "100",
  endLong: "-110",
  riderName: "foo",
  driverName: "bar",
  driverVehicle: "cow",
  rideID: 1,
  created: "2020-05-21 12:46:08"
};

describe("getRideById", () => {
  let db: SinonStubbedInstance<typeof database>;
  before(() => {
    db = stub(database);
  });
  after(() => {
    sinon.restore();
  });
  beforeEach(() => {
    db.all.reset();
  });
  it("should throw when rides are not found", async () => {
    db.all.resolves([]);
    const res = getRideById({ params: { id: "1" } } as any);
    await expect(res).rejectedWith(/Could not find any rides/);
  });
  it("should throw when validation fail", async () => {
    const res = getRideById({ params: { id: "foo" } } as any);
    await expect(res).rejectedWith(/"value" must be a number/);
  });
  it("should return rides from db", async () => {
    db.all.resolves([ride]);
    const res = await getRideById({ params: { id: "1" } } as any);
    expect(db.all.args[0]).deep.equal(["SELECT * FROM Rides WHERE rideID=?", []]);
    expect(res).deep.equal([ride]);
  });
});
