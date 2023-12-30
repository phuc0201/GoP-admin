import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8888/order/create_payment_url';

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
