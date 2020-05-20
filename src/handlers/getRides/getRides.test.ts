import { expect } from "chai";
import { stub } from "sinon";
import * as database from "../../database";
import { getRide } from "./getRides";
import rides from "../../../fixtures/rides.json";

const allStub = stub(database, "all");

describe("getRides", () => {
  beforeEach(() => {
    allStub.reset();
  });

  it("should send the correct query", async () => {
    allStub.resolves(rides);
    const res = await getRide({ query: { page: 5 } } as any);
    expect(res).equal(rides);
    expect(allStub.args[0]).deep.equals(["SELECT * FROM Rides LIMIT 20 OFFSET ?", [100]]);
  });

  it("should throw when page is NaN", async () => {});
  it("should throw when page is negative", async () => {});
  it("should throw when results is empty", async () => {});
});
