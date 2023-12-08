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
  driver: IDriver,
  user: IUser;
}
export interface IStatistics {
  totalOrder: number,
  orderPercentageChange: number,
  totalEarning: number,
  earningPercentageChange: number,
  totalOrderCancelled: number,
  cancelledPercentageChange: number,
}
export class StatisticsCard {
  title: string = '';
  percent: number = 0;
  totalData: number = 0;
}
