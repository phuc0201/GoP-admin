import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddress } from '../../model/management/address.model';
import { IRoutesSummary } from '../../model/management/routes-summary.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private APIKEY = '5b3ce3597851110001cf6248b8ac911881304205ab03a6431b40bc13';
  private apiUrl = 'https://api.openrouteservice.org/geocode';
  private apiUrl_v2 = 'https://api.openrouteservice.org/v2/directions/driving-car';

  searchAddress(query: string): Observable<IAddress> {
    const params = {
      api_key: this.APIKEY,
      text: query,
      size: '10',
    };

    return this.http.get<IAddress>(this.apiUrl + '/search', { params });
  }

  calculateDistance(src: number[], des: number[]): Observable<IRoutesSummary> {
    const body = {
      "coordinates": [
        src,
        des,
      ],
      "profile": "driving-car",
      "format": "geojson"
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + `${this.APIKEY}`
    });

    return this.http.post<IRoutesSummary>(this.apiUrl_v2, body, { headers: headers });
  }
  constructor(private http: HttpClient) { }
}
