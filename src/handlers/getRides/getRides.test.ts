import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { stub } from "sinon";
import * as database from "../../database";
import { getRides } from "./getRides";
import rides from "../../../fixtures/rides.json";

use(chaiAsPromised);

const allStub = stub(database, "all");

describe("getRides", () => {
  beforeEach(() => {
    allStub.reset();
  });

  it("should send the correct query", async () => {
    allStub.resolves(rides);
    const res = await getRides({ query: { page: 5 } } as any);
    expect(res).equal(rides);
    expect(allStub.args[0]).deep.equals(["SELECT * FROM Rides LIMIT 20 OFFSET ?", [100]]);
  });

  it("should throw when page is NaN", async () => {
    const res = getRides({ query: { page: "foo" } } as any);
    await expect(res).rejectedWith(/page must be a number/);
  });

  it("should throw when page is negative", async () => {
    const res = getRides({ query: { page: -2 } } as any);
    await expect(res).rejectedWith(/page must be >= 0/);
  });

  it("should throw when results is empty", async () => {
    allStub.resolves([]);
    const res = getRides({ query: {} } as any);
    await expect(res).rejectedWith(/Could not find any rides/);
  });

  it("should default to page zero", async () => {
    allStub.resolves(rides);
    const res = await getRides({ query: {} } as any);
    expect(res).equal(rides);
    expect(allStub.args[0]).deep.equals(["SELECT * FROM Rides LIMIT 20 OFFSET ?", [0]]);
  });
});
