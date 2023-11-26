
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { URLConstant } from '../../constants/url.constant';
import { IAuthData, ILoginDTO } from '../../model/auth/auth.model';
import { SystemConstant } from '../../constants/system.constant';
import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = URLConstant.API.ADMIN.ENDPOINT;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router
    // private jwtHelper: JwtHelperService
  ) { }


  doLogout(): void {
    this.cookie.delete(SystemConstant.ACCESS_TOKEN, '/', undefined, true, 'Strict');
    localStorage.removeItem(SystemConstant.CURRENT_INFO);
    this.router.navigateByUrl(URLConstant.ROUTE.AUTH.LOGIN);
  }

  doLoginForm(model: Partial<ILoginDTO>): Observable<IAuthData> {
    return this.http.post<IAuthData>(this.apiUrl + URLConstant.API.ADMIN.AUTH.LOGIN, model);
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
    return localStorage.getItem(SystemConstant.CURRENT_INFO) != null;
  }

  getToken(): string {
    return this.cookie.get(SystemConstant.ACCESS_TOKEN) ?? '';
  }

  setToken(accessToken: string): void {
    this.cookie.set(SystemConstant.ACCESS_TOKEN, accessToken, new Date(Date.now() + 43200000), '/', undefined, true, 'Strict');
  }

  checkRole(roleCheck: string): boolean {
    return true;
  }

  isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();
  }

  checkTokenExpired(token: string): boolean {
    return this.isTokenExpired(token) ? true : false;
  }

  generateRefreshToken() {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAuthData()?.refreshToken}`,
    });
    return this.http.get(this.apiUrl + '/auth/admin/refresh', { headers: header });
  }
}
