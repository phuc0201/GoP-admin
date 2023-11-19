import { Injectable } from '@angular/core';
import { URLConstant } from '../../constants/url.constant';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../../model/management/user.model';
import { Observable } from 'rxjs';
import { IPagedResults } from '../../model/common/response-data.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = URLConstant.API.ADMIN + URLConstant.ROUTE.ADMINISTRATION.USERS;

  headers = new HttpHeaders().set('Authorization', `Bearer ${this.authSvc.getToken()}`);

  constructor(
    private http: HttpClient,
    private authSvc: AuthService
  ) { }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl, { headers: this.headers });
  }

  getById(id: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl + `/${id}`, { headers: this.headers });
  }

  getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<IPagedResults<IUser>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<IPagedResults<IUser>>(this.apiUrl + '/filter', { params });
  }

  banAccount(id: string): Observable<IUser> {
    return this.http.put<IUser>(this.apiUrl + `/${id}`, { headers: this.headers });
  }
}
