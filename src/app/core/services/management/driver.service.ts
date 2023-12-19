import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLConstant } from '../../constants/url.constant';
import { IPagedResults } from '../../model/common/response-data.model';
import { IDriver } from '../../model/management/driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private apiUrl = URLConstant.API.ADMIN.ENDPOINT + URLConstant.API.ROLE.ADMIN + URLConstant.API.ADMIN.ROUTE.DRIVERS;
  private apiUrlDriver = URLConstant.API.DRIVER.ENDPOINT + '/drivers';
  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<IDriver[]> {
    return this.http.get<IDriver[]>(this.apiUrl);
  }

  getById(id: string): Observable<IDriver> {
    return this.http.get<IDriver>(this.apiUrl + `?id=${id}`);
  }

  getDriverInfor(): Observable<IDriver> {
    return this.http.get<IDriver>(this.apiUrlDriver + '/userInfor');
  }

  getAllPaging(
    page: number,
    size: number,
    fullname?: string,
    phone?: string): Observable<IPagedResults<IDriver>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', size.toString())
      .set('fullname', fullname ?? '')
      .set('phone', phone ?? '');

    return this.http.get<IPagedResults<IDriver>>(this.apiUrl + '/filter', { params });
  }

  updateImageProfile(formData: FormData): Observable<IDriver> {
    return this.http.patch<IDriver>(URLConstant.API.DRIVER.ENDPOINT + '/drivers/image-profile', formData);
  }

  verifyAccount(id: string, status: boolean): Observable<IDriver>{
    return this.http.patch<IDriver>(URLConstant.API.ADMIN.ENDPOINT + '/admin/driver/verify', { id: id, status: status })
  }

}
