export interface IAuthData {
  accessToken?: string;
  refreshToken?: string;
}
export interface ILoginDTO {
  username: string;
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
