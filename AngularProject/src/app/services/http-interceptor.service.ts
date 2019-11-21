import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { exhaustMap, take, catchError } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) { }



  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const jwtHelper = new JwtHelperService();
    const jwtToken = localStorage.getItem('id_token');


    return this.authService.user.pipe(take(1),
      exhaustMap(() => {
        if (!jwtHelper.isTokenExpired(jwtToken)) {
          const modifiedReq = req.clone({
            params: new HttpParams().set('auth', jwtToken)
          });
          return next.handle(modifiedReq).pipe(catchError(err => {
            console.log(err);
            return throwError(err);
          }));
        }
        return next.handle(req);
      }));

    //   .pipe(tap(event => {
    //   if (event.type === HttpEventType.Response) {
    //     console.log('response recevied');
    //     console.log(event.body);
    //   }
    // }));
  }
}
