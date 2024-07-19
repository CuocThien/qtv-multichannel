import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  isLoggedIn = false;
  async canActivate(): Promise<boolean> {
    await this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    return this.isLoggedIn;
  }
}
