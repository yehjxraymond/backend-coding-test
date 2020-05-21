export interface Ride {
  startLat: number;
  endLat: number;
  startLong: number;
  endLong: number;
  riderName: string;
  driverName: string;
  driverVehicle: string;
}

export interface RideEntry extends Ride {
  created: string;
  rideID: number;
}
