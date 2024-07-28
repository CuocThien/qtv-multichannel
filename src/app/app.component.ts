import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isCollapsed = false;

  constructor(
    private authService: AuthService,
    private msalService: MsalService,
  ) {}

  ngOnInit(): void {
    this.msalService.instance
      .initialize()
      .then(() => {
        // MSAL instance is initialized
      })
      .catch((error) => {
        console.error('MSAL initialization error: ', error);
      });
    this.isLoggedIn = this.authService.getToken() !== null;
  }

  logout(): void {
    this.authService.logout();
  }
}
