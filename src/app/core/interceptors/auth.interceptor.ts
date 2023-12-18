import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { IAuthData } from '../model/auth/auth.model';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private inject: Injector
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authservice = this.inject.get(AuthService);
    let authreq = request;
    try {
      if (authservice.getToken() !== '' && !authservice.checkTokenExpired(authservice.getToken())) {
        authreq = this.addTokenHeader(request, authservice.getToken());
      }
      return next.handle(authreq).pipe(
        catchError((errordata) => {
          const rfToken = authservice.getAuthData()?.refreshToken || '';
          if (authservice.checkTokenExpired(rfToken)) {
            return throwError(() => errordata);
          }
          if (errordata.status === 401) {
            return this.handleRefrehToken(request, next);
          }
          return throwError(() => errordata);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
    try {
      let authservice = this.inject.get(AuthService);
      return authservice.generateRefreshToken()?.pipe(
        switchMap((data: IAuthData) => {
          authservice.setToken(data?.accessToken ??
            '');
          authservice.setAuthData(data);
          return next.handle(this.addTokenHeader(request, data.accessToken));
        }),
        catchError(errordata => {
          return throwError(() => errordata);
        })
      );
    } catch (error) {
      return throwError(() => error);;
    }
  }

  addTokenHeader(request: HttpRequest<any>, token: any) {
    return request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) });
  }
}
