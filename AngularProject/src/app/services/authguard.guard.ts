import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const jwtHelper = new JwtHelperService();

    return this.authService.user.pipe(take(1), map(() => {
      const isAuth = localStorage.getItem('id_token');
      if (isAuth && !jwtHelper.isTokenExpired(isAuth)) {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    }));
  }
}
