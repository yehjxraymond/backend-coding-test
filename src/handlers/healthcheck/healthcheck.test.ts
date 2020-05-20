import { healthCheck } from "./healthcheck";
import { expect } from "chai";

describe("healthCheck", () => {
  it("returns healthy", () => {
    expect(healthCheck()).to.equal("Healthy");
  });
});
