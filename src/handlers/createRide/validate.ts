import joi from "@hapi/joi";
import { throwValidationError } from "../../error";
import { RideInput } from "../../types";

interface RideInputRaw {
  [key: string]: string;
}

const rideSchema = joi.object({
  start_lat: joi
    .number()
    .min(-90)
    .max(90)
    .required(),
  end_lat: joi
    .number()
    .min(-90)
    .max(90)
    .required(),
  start_long: joi
    .number()
    .min(-180)
    .max(180)
    .required(),
  end_long: joi
    .number()
    .min(-180)
    .max(180)
    .required(),
  rider_name: joi.string().required(),
  driver_name: joi.string().required(),
  driver_vehicle: joi.string().required()
});

export const validateRideInput = (input: RideInputRaw) => {
  const { value, error } = rideSchema.validate(input);
  if (error) throwValidationError(error.message);
  return value as RideInput;
};
