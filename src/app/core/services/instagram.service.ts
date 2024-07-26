import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models';
import { Observable } from 'rxjs';
import { API_URL } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class FacebookService {
  constructor(private http: HttpClient) {}

  getPostDetail(id: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/facebook/post/${id}`);
  }
}
