export interface IUser {
  id: string;
  fullname: string;
  email: string;
  location: [{
    lat: number,
    long: number
  }],
  accessToken: string;
  refreshToken: string;
  avatar: string;
}
