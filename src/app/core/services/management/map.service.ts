import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddress } from '../../model/management/address.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private nominatimUrl = 'https://nominatim.openstreetmap.org/';
  searchAddress(query: string): Observable<IAddress[]> {
    const params = new HttpParams()
      .set('q', query)
      .set('format', 'json')
      .set('limit', '5');

    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.get<IAddress[]>(this.nominatimUrl + 'search', { params, headers });
  }

  constructor(private http: HttpClient) { }
}
