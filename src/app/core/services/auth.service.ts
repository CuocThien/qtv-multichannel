import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL } from '../../../environments/environment.prod';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private readonly REF_TOKEN_KEY = 'authRefeshToken';
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private readonly http: HttpClient,
    private message: NzMessageService,
  ) {}

  login(username: string, password: string): boolean {
    // Add your authentication logic here
    let isSuccess = false;
    this.http.post(`${API_URL}/auth/login`, { username, password }).subscribe(
      (response: any) => {
        const { accessToken, refreshToken } = response?.data;
        localStorage.setItem(this.TOKEN_KEY, accessToken);
        localStorage.setItem(this.REF_TOKEN_KEY, refreshToken);
        this.isLoggedInSubject.next(true);
        this.router.navigate(['/home']);
        isSuccess = true;
        this.message.error(response.data.message);
      },
      (error) => {
        this.message.error(error.error.message);
      },
    );
    return isSuccess;
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
