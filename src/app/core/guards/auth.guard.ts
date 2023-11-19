import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { URLConstant } from '../constants/url.constant';
export const canActiveGuard: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {

  const authSvc = inject(AuthService);
  const routerSvc = inject(Router);
  
  const fallbackRedirectUrl: string = URLConstant.ROUTE.AUTH.LOGIN
  try {
      if (authSvc.validateUserToken()) {
        return true;
      }
      else {
        routerSvc.navigateByUrl(fallbackRedirectUrl);
        return false;
      }
  } catch (error) {
    routerSvc.navigateByUrl(fallbackRedirectUrl);
    return false;
  }
};
