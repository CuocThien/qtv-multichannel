import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';

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
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
