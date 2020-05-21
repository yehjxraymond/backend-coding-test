import { expect } from "chai";
import { validateRideInput } from "./validate";

const validInput = {
  startLat: "20",
  endLat: "30",
  startLong: "100",
  endLong: "-110",
  riderName: "foo",
  driverName: "bar",
  driverVehicle: "cow"
};

describe("validateRideInput", () => {
  it("should return the coerced values when validation passes", () => {
    const input = validateRideInput(validInput);
    expect(input).deep.equal({
      startLat: 20,
      endLat: 30,
      startLong: 100,
      endLong: -110,
      riderName: "foo",
      driverName: "bar",
      driverVehicle: "cow"
    });
  });

  it("should throw when startLat fails validation", () => {
    expect(() => validateRideInput({ ...validInput, startLat: "moo" })).throws(/"startLat" must be a number/);
    expect(() => validateRideInput({ ...validInput, startLat: "91" })).throws(
      /"startLat" must be less than or equal to 90/
    );
    expect(() => validateRideInput({ ...validInput, startLat: "-91" })).throws(
      /"startLat" must be larger than or equal to -90/
    );
  });

  it("should throw when endLat fails validation", () => {
    expect(() => validateRideInput({ ...validInput, endLat: "moo" })).throws(/"endLat" must be a number/);
    expect(() => validateRideInput({ ...validInput, endLat: "91" })).throws(
      /"endLat" must be less than or equal to 90/
    );
    expect(() => validateRideInput({ ...validInput, endLat: "-91" })).throws(
      /"endLat" must be larger than or equal to -90/
    );
  });

  it("should throw when startLong fails validation", () => {
    expect(() => validateRideInput({ ...validInput, startLong: "moo" })).throws(/"startLong" must be a number/);
    expect(() => validateRideInput({ ...validInput, startLong: "181" })).throws(
      /"startLong" must be less than or equal to 180/
    );
    expect(() => validateRideInput({ ...validInput, startLong: "-181" })).throws(
      /"startLong" must be larger than or equal to -180/
    );
  });

  it("should throw when endLong fails validation", () => {
    expect(() => validateRideInput({ ...validInput, endLong: "moo" })).throws(/"endLong" must be a number/);
    expect(() => validateRideInput({ ...validInput, endLong: "181" })).throws(
      /"endLong" must be less than or equal to 180/
    );
    expect(() => validateRideInput({ ...validInput, endLong: "-181" })).throws(
      /"endLong" must be larger than or equal to -180/
    );
  });

  it("should throw when riderName fails validation", () => {
    expect(() => validateRideInput({ ...validInput, riderName: "" })).throws(/"riderName" is not allowed to be empty/);
  });

  it("should throw when driverName fails validation", () => {
    expect(() => validateRideInput({ ...validInput, driverName: "" })).throws(
      /"driverName" is not allowed to be empty/
    );
  });

  it("should throw when driverVehicle fails validation", () => {
    expect(() => validateRideInput({ ...validInput, driverVehicle: "" })).throws(
      /"driverVehicle" is not allowed to be empty/
    );
  });
});
