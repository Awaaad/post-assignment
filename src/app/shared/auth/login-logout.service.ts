import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginLogoutService {

  @Output() sessionStateEmitter = new EventEmitter<any>();

  constructor(
      private router: Router,
      private http: HttpClient) {
  
  }

  loginUser(user: any) {
      if (user) {
          this.sessionStateEmitter.emit(user);
      }
  }

  logoutUser() {
      this.sessionStateEmitter.emit(false);
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
  }
}
