export interface IOrder{
  id: number,
  date: string,
  customer_id: string,
  driver_id: string,
  source_lat: number,
  source_long: number,
  destiny_lat: number,
  destiny_long: number,
  source_address: string,
  destiny_address: string,
  fare: number,
}
