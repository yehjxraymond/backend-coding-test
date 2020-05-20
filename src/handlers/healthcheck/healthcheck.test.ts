import { expect } from "chai";
import { healthCheck } from "./healthcheck";

describe("healthCheck", () => {
  it("returns healthy", () => {
    expect(healthCheck()).to.equal("Healthy");
  });
});
