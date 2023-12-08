import { IStatus } from "./driver-status.model";
import { ILocation } from "./location.model";
import { Vehicle } from "./vehicle.model";

export interface IDriver {
  id: string;
  phone: string;
  password: string;
  fullname: string;
  vehicle: Vehicle;
  vehicleId: string;
  isVerified: boolean;
  avatar?: string;
  vehicleImage: string;
  cavet_f: string;
  cavet_b: string;
  identification_card_f: string;
  identification_card_b: string;
  license_image_f: string;
  license_image_b: string;
  location: ILocation;
  status: IStatus;
  refreshToken: string;
}
