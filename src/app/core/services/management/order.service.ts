import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLConstant } from '../../constants/url.constant';
import { IPagedResults } from '../../model/common/response-data.model';
import { IOrder, IStatistics } from '../../model/management/order.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = URLConstant.API.ADMIN.ENDPOINT + URLConstant.API.ROLE.ADMIN + URLConstant.API.ADMIN.ROUTE.JOURNEYS;

  headers = new HttpHeaders().set('Authorization', `Bearer ${this.authSvc.getToken()}`);

  constructor(
    private http: HttpClient,
    private authSvc: AuthService
  ) { }

  getAll(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.apiUrl, { headers: this.headers });
  }

  getById(id: string): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.apiUrl + `/${id}`, { headers: this.headers });
  }

  getByUID(uid: string): Observable<IPagedResults<IOrder>> {
    return this.http.get<IPagedResults<IOrder>>(this.apiUrl + `?uid=${uid}`);
  }

  getStatisticsByUser(id: string): Observable<IStatistics> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<IStatistics>(this.apiUrl + '/users/statistics', { params });
  }

  getStatisticsByDriver(id: string): Observable<IStatistics> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<IStatistics>(this.apiUrl + '/drivers/statistics', { params });
  }

  getAllPaging(
    uid: string,
    currPage: number,
    limit: number,
    src_address?: string,
    des_address?: string): Observable<IPagedResults<IOrder>> {
    const params = new HttpParams()
      .set('uid', uid.toString())
      .set('currPage', currPage.toString())
      .set('limit', limit.toString())
      .set('des', des_address ?? '')
      .set('src', src_address ?? '');

    return this.http.get<IPagedResults<IOrder>>(this.apiUrl + '/filter', { params });
  }

  getAllPagingByUser(
    uid: string,
    currPage: number,
    limit: number,
    src_address?: string,
    des_address?: string): Observable<IPagedResults<IOrder>> {
    const params = new HttpParams()
      .set('uid', uid.toString())
      .set('currPage', currPage.toString())
      .set('limit', limit.toString())
      .set('des', des_address ?? '')
      .set('src', src_address ?? '');

    return this.http.get<IPagedResults<IOrder>>(this.apiUrl + '/users/filter', { params });
  }
  getAllPagingByDriver(
    driverId: string,
    currPage: number,
    limit: number,
    src_address?: string,
    des_address?: string): Observable<IPagedResults<IOrder>> {
    const params = new HttpParams()
      .set('id', driverId.toString())
      .set('currPage', currPage.toString())
      .set('limit', limit.toString())
      .set('des', des_address ?? '')
      .set('src', src_address ?? '');

    return this.http.get<IPagedResults<IOrder>>(this.apiUrl + '/drivers/filter', { params });
  }
}
