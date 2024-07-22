// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services';
import { API_URL } from '../../../environments/environment.prod';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const uploadUrl = [`${API_URL}/uploads`, `${API_URL}/upload`];
    if (uploadUrl.includes(req.url)) {
      return next.handle(req);
    }
    const authToken = this.authService.getToken();
    let headers = req.headers.set('Content-Type', 'application/json');

    if (authToken) {
      headers = headers.set('Authorization', `Bearer ${authToken}`);
    }

    const clonedRequest = req.clone({ headers });

    return next.handle(clonedRequest);
  }
}
