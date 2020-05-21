import joi from "@hapi/joi";
import { throwValidationError } from "../../error";
import { Ride } from "../../types";

interface RideInputRaw {
  [key: string]: string;
}

const rideSchema = joi.object({
  startLat: joi
    .number()
    .min(-90)
    .max(90)
    .required(),
  endLat: joi
    .number()
    .min(-90)
    .max(90)
    .required(),
  startLong: joi
    .number()
    .min(-180)
    .max(180)
    .required(),
  endLong: joi
    .number()
    .min(-180)
    .max(180)
    .required(),
  riderName: joi.string().required(),
  driverName: joi.string().required(),
  driverVehicle: joi.string().required()
});

export const validateRideInput = (input: RideInputRaw) => {
  const { value, error } = rideSchema.validate(input);
  if (error) throwValidationError(error.message);
  return value as Ride;
};
