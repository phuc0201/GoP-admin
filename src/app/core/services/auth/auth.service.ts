
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { URLConstant } from '../../constants/url.constant';
import { IAuthData, ILoginDTO } from '../../model/auth/auth.model';
import { SystemConstant } from '../../constants/system.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = URLConstant.API.ADMIN.ENDPOINT + URLConstant.API.ADMIN.ROUTE.USERS;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
  ) { }


  doLogout(): void {
    this.cookie.delete(SystemConstant.CURRENT_INFO, '/', undefined, true, 'Strict');
    localStorage.removeItem(SystemConstant.CURRENT_INFO);
    window.location.assign('../');
  }

  doLoginForm(model: Partial<ILoginDTO>): Observable<IAuthData> {
    return this.http.post<IAuthData>(this.apiUrl, model);
  }

  /************************************
 *       Processing Auth Data
 ************************************/
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

  getToken(): string {
    return this.cookie.get(SystemConstant.CURRENT_INFO) ?? '';
  }

  setToken(accessToken: string): void {
    this.cookie.set(SystemConstant.CURRENT_INFO, accessToken, new Date(Date.now() + 43200000), '/', undefined, true, 'Strict');
  }

  /************************************
   *           Check role
   ************************************/
  checkRole(roleCheck: string): boolean {
    const auth = this.getAuthData();
    if (auth) {
      let role: string[] = [];
      role = auth.roles?.filter(item => item === roleCheck) ?? [];
      if (role.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  validateUserToken(): boolean {
    // if(!this.userSvc.getAll()){
    //   return false;
    // }
    // return true
    if(this.getToken() !== ''){
      return true;
    }
    return false
  }
}
