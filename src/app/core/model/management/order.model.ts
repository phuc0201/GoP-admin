import { IAddressDetail } from "./address.model";
import { IDriver } from "./driver.model";
import { ILocation } from "./location.model";
import { OrderStatus } from "./order-status.model";
import { IUser } from "./user.model";

export interface IOrder {
  id: number,
  orderStatus: OrderStatus,
  orderTotal: number,
  source_location: ILocation,
  destination_location: ILocation,
  source_address: string,
  destination_address: string,
  driver?: IDriver,
  user?: IUser;
  vehicle_type?: string;
}

export interface IOrderFormDTO {
  userPhoneNumber: string;
  source_address: IAddressDetail,
  destination_address: IAddressDetail,
  vehicle_type: string;
}

export interface IStatistics {
  totalOrder: number,
  orderPercentageChange: number,
  totalEarning: number,
  earningPercentageChange: number,
  totalOrderCancelled: number,
  cancelledPercentageChange: number,
  percentOrderCompleted?: number;
}
export class StatisticsCard {
  title: string = '';
  percent: number = 0;
  totalData: number = 0;
}

export interface IOrderByTime {
  date: string,
  total: number;
}

export interface IOrderDTO {
  user: string;
  source_address: string;
  destination_address: string;
  orderTotal: number;
  source_location: {
    lat: number;
    long: number;
  };
  destination_location: {
    lat: number;
    long: number;
  };
  distance: number;
  duration: number;
  vehicle_type: string;
}
