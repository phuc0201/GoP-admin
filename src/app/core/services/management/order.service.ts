import { Injectable } from '@angular/core';
import { URLConstant } from '../../constants/url.constant';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { IOrder } from '../../model/management/order.model';
import { Observable } from 'rxjs';
import { IPagedResults } from '../../model/common/response-data.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = URLConstant.API.ADMIN.ENDPOINT + URLConstant.API.ADMIN.ROUTE.JOURNEYS;

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

  getByCusId(id: string): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.apiUrl + `/${id}`, { headers: this.headers });
  }
  
  getAllPaging(
    page: number,
    size: number,
    search?: string,): Observable<IPagedResults<IOrder>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '');

    return this.http.get<IPagedResults<IOrder>>(this.apiUrl + '/filter', { params });
  }
}
