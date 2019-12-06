import { Router } from '@angular/router';
import { User } from './../auth/user.model';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  collapsed = true;
  userSubscription: Subscription;
  isAuthenticated = false;

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe((user: User) => {
      if (user) {

        this.isAuthenticated = !!user;
      } else {
        localStorage.getItem('id_token') ? this.isAuthenticated = true : this.isAuthenticated = false;
      }
    });
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.value) {
        this.authService.logout();
        this.swalWithBootstrapButtons.fire(
          'Successfully Logged Out'
        )
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
