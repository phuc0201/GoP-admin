export interface IAuthData {
  avatar: string;
  accessToken?: string;
  refreshToken?: string;
  expired: number;
  roles: string[];
  fullName: string;
}
export interface ILoginDTO {
  email: string;
  password: string;
  remember: boolean;
}
export interface IRegisterDTO {
  email: string;
  password: string;
  repassword: string;
}

export interface IResetPasswordRequsetDTO {
  email: string;
}
