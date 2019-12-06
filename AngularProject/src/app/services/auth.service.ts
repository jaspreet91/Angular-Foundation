import { Router } from '@angular/router';
import { User } from './../auth/user.model';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  // user subject to store user

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  // sign up a new user function
  signUp(email: string, password: string) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJpJxIW3NxIQhIe-yXIu6o92gNUPVAJAA',
        { email, password, returnSecureToken: true }
    ).pipe(catchError(errorRes => {
      return this.errorHandling(errorRes);
    }), tap(resData => {
      // ignore the tslint errors if any
      this.handleAuthentication(resData['email'], resData['localId'], resData['idToken'], +resData['expiresIn']);
    }));
  }

  // login a user function
  login(email: string, password: string) {
   return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJpJxIW3NxIQhIe-yXIu6o92gNUPVAJAA',
      { email, password, returnSecureToken: true }
   ).pipe(catchError(errorRes => {
     return this.errorHandling(errorRes);
   }), tap(resData => {
         // ignore the tslint errors if any
     this.handleAuthentication(resData['email'], resData['localId'], resData['idToken'], +resData['expiresIn']);
   }));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    this.user.next(null);
    this.router.navigate(['/auth']);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  // function to handle error from the api calls
  private errorHandling(errorRes: HttpErrorResponse) {
    let errorMessage = 'unknown error';
    if (!errorRes.error.error || !errorRes.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'USER EMAIL ALREADY EXISTS';
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password, try again';
        break;

      case 'EMAIL_NOT_FOUND':
        errorMessage = 'USER EMAIL NOT FOUND';
        break;

      case 'USER_DISABLED':
        errorMessage = 'USER ACCOUNT HAS BEEN DISABLED';
        break;

      default:
         errorMessage = errorRes.error.error.message;
         break;
    }

    return throwError(errorMessage);
  }

  // function to handle user authentication

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('email', email);
    localStorage.setItem('userId', userId);
    localStorage.setItem('id_token', token);
    localStorage.setItem('expires_at', JSON.stringify(expirationDate.valueOf()));
    this.autoLogout(expiresIn * 1000);
    this.user.next(user);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Token expired. Login again.'
      }).then(() => {
        this.logout();
      });
}, expirationDuration );
  }
}
