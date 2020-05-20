import { handlerBoundary } from "../handlerBoundary";

export const healthCheck = () => "Healthy";
export const healthCheckHandler = handlerBoundary(healthCheck);
