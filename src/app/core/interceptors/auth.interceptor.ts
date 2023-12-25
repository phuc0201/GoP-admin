import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { URLConstant } from '../constants/url.constant';
import { IAuthData } from '../model/auth/auth.model';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private inject: Injector,
    private router: Router,
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authservice = this.inject.get(AuthService);
    let authreq = request;
    if (request.headers.get('Authorization') === URLConstant.API.KEY_MAP)
      return next.handle(request);
    else{
      if (authservice.getToken() !== '' && !authservice.checkTokenExpired(authservice.getToken())) {
        authreq = this.addTokenHeader(request, authservice.getToken());
      }
      return next.handle(authreq).pipe(
        catchError((errordata) => {
          const rfToken = authservice.getAuthData()?.refreshToken || '';
          if (authservice.checkTokenExpired(rfToken)) {
            authservice.doLogout();
            return throwError(() => errordata);
          }
          else if (errordata.status === 401) {
            return this.handleRefrehToken(request, next);
          }
          else {
            authservice.doLogout();
            return throwError(() => errordata);
          }
        }),
      );
    }
  }

  handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
    let authservice = this.inject.get(AuthService);

    return authservice.generateRefreshToken().pipe(
      switchMap((data: IAuthData) => {
        authservice.setToken(data?.accessToken ??
          '');
        authservice.setAuthData(data);
        return next.handle(this.addTokenHeader(request, data.accessToken));
      }),
      catchError((err) => {
        authservice.doLogout();
        return throwError(() => err);
      }),
    );
  }

  addTokenHeader(request: HttpRequest<any>, token: any) {
    return request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) });
  }
}
