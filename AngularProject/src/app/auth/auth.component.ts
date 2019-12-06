import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService,
              private router: Router) { }

  isloginMode = true;
  isLoading = false;
  authForm: NgForm;
  errorMessage: string = null;
  closebox = false;
  authObs: Observable<any>;

  ngOnInit() {}

  onSwitchMode() {
    this.isloginMode = !this.isloginMode;
  }

  onSubmit(authFormData: NgForm) {
    this.isLoading = true;
    this.authObs = !this.isloginMode ?
      // if logic
      this.authService.login(
        authFormData.value.email,
        authFormData.value.password
      )
      // else logic
      : this.authService
        .signUp(authFormData.value.email, authFormData.value.password);

    this.authObs.subscribe(res => {
      if (res.hasOwnProperty('idToken')) {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }
    }, error => {
      this.isLoading = false;
      this.errorMessage = error;
    });
    authFormData.reset();
  }

  closeBox() {
    this.closebox = true;
  }
}
