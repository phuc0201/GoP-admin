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
}

export interface IOrderFormDTO {
  userPhoneNumber: string;
  source_location_lat: string,
  source_location_long: string,
  destination_location_lat: string,
  destination_location_long: string,
  source_address: string,
  destination_address: string,
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
  user: string;
}
