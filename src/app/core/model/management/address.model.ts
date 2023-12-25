export interface IAddress {
  features: IAddressDetail[];
}
export interface IAddressDetail {
  geometry: {
    coordinates: number[];
  },
  properties: {
    name: string;
  };
}

export interface IAddressDTO {
  address: string,
  lat: number,
  long: number;
}
