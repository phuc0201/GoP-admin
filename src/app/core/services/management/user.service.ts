import { Injectable } from '@angular/core';
import { URLConstant } from '../../constants/url.constant';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IUser } from '../../model/management/user.model';
import { Observable } from 'rxjs';
import { IPagedResults } from '../../model/common/response-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = URLConstant.API.ADMIN.ENDPOINT + URLConstant.API.ROLE.ADMIN + URLConstant.API.ADMIN.ROUTE.USERS;

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  getById(id: string): Observable<IUser> {
    return this.http.get<IUser>(this.apiUrl + `?id=${id}`);
  }

  getAllPaging(
    page: number,
    size: number,
    fullname?: string,
    phone?: string): Observable<IPagedResults<IUser>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', size.toString())
      .set('fullname', fullname ?? '')
      .set('phone', phone ?? '');

    return this.http.get<IPagedResults<IUser>>(this.apiUrl + '/filter', { params});
  }

  banAccount(id: string): Observable<IUser> {
    const updatedData = { banned: true };
    return this.http.put<IUser>(this.apiUrl + `/${id}`, updatedData);
  }
}
