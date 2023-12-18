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
  vehicleImage?: string;
  Cavet_f?: string;
  Cavet_b?: string;
  identification_card_f?: string;
  identification_card_b?: string;
  license_image_f?: string;
  license_image_b?: string;
  location: ILocation;
  status: IStatus;
  rate?: number;
  totalRate?: number;
  totalRateCount?: number;
  refreshToken: string;
}

export interface IDriverDTO {
  phone: string,
  password: string,
  fullname: string,
  vehicle: string;
}

export interface IDriverImageDTO {
  avatar?: File,
  vehicleImage?: File,
  Cavet_f?: File,
  Cavet_b?: File,
  identification_card_f?: File,
  identification_card_b?: File,
  license_image_f?: File,
  license_image_b?: File,
}

// rate: number

// @Prop({ default: 0 })
// totalRate: number

// @Prop({ default: 0 })
// totalRateCount: number
