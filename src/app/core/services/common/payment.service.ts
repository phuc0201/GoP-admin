import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLConstant } from '../../constants/url.constant';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = URLConstant.API.ADMIN.ENDPOINT + '/orders/create_payment_url';

  constructor(
    private http: HttpClient
  ) { }

  getPayment(amount: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      amount: amount,
      bankCode: null,
      language: 'vn'
    });
  }
}
