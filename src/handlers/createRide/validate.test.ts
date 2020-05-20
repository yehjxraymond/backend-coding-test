import { expect } from "chai";
import { validateRideInput } from "./validate";

const validInput = {
  start_lat: "20",
  end_lat: "30",
  start_long: "100",
  end_long: "-110",
  rider_name: "foo",
  driver_name: "bar",
  driver_vehicle: "cow"
};

describe("validateRideInput", () => {
  it("should return the coerced values when validation passes", () => {
    const input = validateRideInput(validInput);
    expect(input).deep.equal({
      start_lat: 20,
      end_lat: 30,
      start_long: 100,
      end_long: -110,
      rider_name: "foo",
      driver_name: "bar",
      driver_vehicle: "cow"
    });
  });

  it("should throw when start_lat fails validation", () => {
    expect(() => validateRideInput({ ...validInput, start_lat: "moo" })).throws(/"start_lat" must be a number/);
    expect(() => validateRideInput({ ...validInput, start_lat: "91" })).throws(
      /"start_lat" must be less than or equal to 90/
    );
    expect(() => validateRideInput({ ...validInput, start_lat: "-91" })).throws(
      /"start_lat" must be larger than or equal to -90/
    );
  });

  it("should throw when end_lat fails validation", () => {
    expect(() => validateRideInput({ ...validInput, end_lat: "moo" })).throws(/"end_lat" must be a number/);
    expect(() => validateRideInput({ ...validInput, end_lat: "91" })).throws(
      /"end_lat" must be less than or equal to 90/
    );
    expect(() => validateRideInput({ ...validInput, end_lat: "-91" })).throws(
      /"end_lat" must be larger than or equal to -90/
    );
  });

  it("should throw when start_long fails validation", () => {
    expect(() => validateRideInput({ ...validInput, start_long: "moo" })).throws(/"start_long" must be a number/);
    expect(() => validateRideInput({ ...validInput, start_long: "181" })).throws(
      /"start_long" must be less than or equal to 180/
    );
    expect(() => validateRideInput({ ...validInput, start_long: "-181" })).throws(
      /"start_long" must be larger than or equal to -180/
    );
  });

  it("should throw when end_long fails validation", () => {
    expect(() => validateRideInput({ ...validInput, end_long: "moo" })).throws(/"end_long" must be a number/);
    expect(() => validateRideInput({ ...validInput, end_long: "181" })).throws(
      /"end_long" must be less than or equal to 180/
    );
    expect(() => validateRideInput({ ...validInput, end_long: "-181" })).throws(
      /"end_long" must be larger than or equal to -180/
    );
  });

  it("should throw when rider_name fails validation", () => {
    expect(() => validateRideInput({ ...validInput, rider_name: "" })).throws(
      /"rider_name" is not allowed to be empty/
    );
  });

  it("should throw when driver_name fails validation", () => {
    expect(() => validateRideInput({ ...validInput, driver_name: "" })).throws(
      /"driver_name" is not allowed to be empty/
    );
  });

  it("should throw when driver_vehicle fails validation", () => {
    expect(() => validateRideInput({ ...validInput, driver_vehicle: "" })).throws(
      /"driver_vehicle" is not allowed to be empty/
    );
  });
});
