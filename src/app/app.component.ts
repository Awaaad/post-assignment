import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginLogoutService } from './shared/auth/login-logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  events: string[] = [];
  opened: boolean;
  showFiller = false;
  public isloggedIn = false;
  public isAdmin = false;

  public sessionSubscription: Subscription;

  constructor(
    private readonly loginLogoutService: LoginLogoutService
  ) {
    if (localStorage.getItem('role') === 'ADMIN') {
      this.isAdmin = true;
      this.isloggedIn = true;
    } else {
      this.isAdmin = false;
      this.isloggedIn = false;
    }

    this.sessionSubscription = this.loginLogoutService.sessionStateEmitter.subscribe(data => {
      if (data) {
        this.isAdmin = true;
        this.isloggedIn = true;
      } else {
        this.isAdmin = false;
        this.isloggedIn = false;
      }
    })
  }

  public logout(): void {
    this.isAdmin = false;
    this.isloggedIn = false;
    this.loginLogoutService.logoutUser();
  }

  ngOnDestroy() {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }
}


