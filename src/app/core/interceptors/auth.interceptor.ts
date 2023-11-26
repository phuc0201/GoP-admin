import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { IAuthData } from '../model/auth/auth.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private inject: Injector
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
      let authservice = this.inject.get(AuthService);
      let authreq = request;
      if(authservice.getToken()!==''){
        authreq = this.addTokenHeader(request, authservice.getToken());
      }
      return next.handle(authreq).pipe(
        catchError(errordata => {
          try {
            if (errordata.status === 401 && authservice.getAuthData()) {
              return this.handleRefrehToken(request, next);
            }
            else
              authservice.doLogout();
          } catch (error) {
            authservice.doLogout();
            return throwError(() => errordata);
          }
          return throwError(() => errordata);
        })
      );
  }

  handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
    let authservice = this.inject.get(AuthService);
    return authservice.generateRefreshToken().pipe(
      switchMap((data: IAuthData) => {
        authservice.setToken(data?.accessToken ??
          '');
        authservice.setAuthData(data)
        return next.handle(this.addTokenHeader(request,data.accessToken))
      }),
      catchError(errordata=>{
        authservice.doLogout();
        return throwError(() => errordata);
      })
    );
  }

  addTokenHeader(request: HttpRequest<any>, token: any) {
    return request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) });
  }
}
