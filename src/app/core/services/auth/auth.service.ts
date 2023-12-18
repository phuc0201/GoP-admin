
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { SystemConstant } from '../../constants/system.constant';
import { URLConstant } from '../../constants/url.constant';
import { IAuthData, IDriverLoginDTO, ILoginDTO } from '../../model/auth/auth.model';
import { IDriver, IDriverDTO } from '../../model/management/driver.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = URLConstant.API.ADMIN.ENDPOINT;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router,
  ) { }


  doLogout(): void {
    if (this.router.url.includes('administration') || this.router.url.includes('admin')) {
      this.router.navigateByUrl(URLConstant.ROUTE.AUTH.LOGIN);
      this.clearToken();
    }
    else {
      this.router.navigateByUrl(URLConstant.ROUTE.AUTH.DRIVER_LOGIN);
      this.clearToken();
    }
  }

  clearToken() {
    this.cookie.delete(SystemConstant.ACCESS_TOKEN, '/', undefined, true, 'Strict');
    localStorage.removeItem(SystemConstant.CURRENT_INFO);
  }

  doAdminLoginForm(model: Partial<ILoginDTO>): Observable<IAuthData> {
    return this.http.post<IAuthData>(this.apiUrl + URLConstant.API.ADMIN.AUTH.LOGIN, model);
  }

  doDriverLoginForm(model: Partial<IDriverLoginDTO>): Observable<IAuthData> {
    return this.http.post<IAuthData>(URLConstant.API.DRIVER.ENDPOINT + URLConstant.API.DRIVER.AUTH.LOGIN, model);
  }

  getAuthData(): IAuthData | null {
    const tmp = localStorage.getItem(SystemConstant.CURRENT_INFO);
    if (tmp) {
      return JSON.parse(tmp);
    } else {
      return null;
    }
  }

  setAuthData(model: IAuthData): void {
    localStorage.setItem(
      SystemConstant.CURRENT_INFO,
      JSON.stringify(model)
    );
  }

  isLogged() {
    return localStorage.getItem(SystemConstant.CURRENT_INFO) ? true : false;
  }

  getToken(): string {
    return this.cookie.get(SystemConstant.ACCESS_TOKEN) ?? '';
  }

  setToken(accessToken: string): void {
    this.cookie.set(SystemConstant.ACCESS_TOKEN, accessToken, new Date(Date.now() + 43200000), '/', undefined, true, 'Strict');
  }

  isAdmin(): boolean {
    try {
      const token = this.getAuthData()?.refreshToken ?? '';
      const role = (JSON.parse(atob(token.split('.')[1]))).role;
      return role ? (role === 'admin' ? true : false) : false;
    } catch (error) {
      return false;
    }
  }

  isDriver(): boolean {
    try {
      const token = this.getAuthData()?.refreshToken ?? '';
      const role = (JSON.parse(atob(token.split('.')[1]))).role;
      return role ? (role === 'driver' ? true : false) : false;
    } catch (error) {
      return false;
    }
  }


  isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry * 1000 < Date.now();
  }

  checkTokenExpired(token: string): boolean {
    try {
      if (this.isTokenExpired(token))
        return true;
      return false;
    } catch (error) {
      return true;
    }
  }

  generateRefreshToken(): Observable<IAuthData> {
    const authData = this.getAuthData();
    if (!authData || !authData.refreshToken) {
      return throwError(() => 'Refresh token is not available.');
    }
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authData.refreshToken}`,
    });
    const url = this.router.url.includes('administration') || this.router.url.includes('admin')
      ? `${this.apiUrl}/auth/admin/refresh`
      : `${this.apiUrl}/auth/driver/refresh`;

    return this.http.get<IAuthData>(url, { headers: header });
  }

  sendOTP(phone: string): any {
    return this.http.post<any>(this.apiUrl + '/auth/driver/signup-send-otp', {
      phone: phone
    });
  }

  verifyOTP(phone: string, code: string): any {
    return this.http.post<any>(this.apiUrl + '/auth/driver/signup-verify-otp', {
      phone: phone,
      code: code
    });
  }

  createDriver(driver: IDriverDTO): Observable<IDriver> {
    return this.http.post<IDriver>(this.apiUrl + '/auth/driver/signup', driver);
  }
}
