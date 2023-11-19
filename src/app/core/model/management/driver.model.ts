import { Status } from "./driver-status.model";
import { Vehicle } from "./vehicle.model";

export interface IDriver {
  phone: string;
  vehicle: Vehicle;
  vehicleId: string;
  avatar: string;
  vehicleImage: string;
  location: {
    lat: number,
    long: number
  };
  status: Status;
  refreshToken: string
}
