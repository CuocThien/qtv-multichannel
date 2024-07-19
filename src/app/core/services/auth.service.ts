import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Add your authentication logic here
    if (username === 'user' && password === 'password') {
      localStorage.setItem(
        this.TOKEN_KEY,
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEsIm9yZ2FuaXphdGlvbklkIjoxLCJpYXQiOjE2OTcyNzgzNDQsImV4cCI6MTY5NzM2NDc0NH0.TNiw6eAbzZwNJ6OSF1RSsG-VEP0JH7_MU6yqC1Uu34I',
      );
      this.isLoggedInSubject.next(true);
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): Observable<boolean> {
    this.isLoggedInSubject.next(this.getToken() !== null);
    return this.isLoggedInSubject.asObservable();
  }
}
