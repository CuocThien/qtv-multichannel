import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Comment,
  FacebookComment,
  FacebookPost,
  FacebookReact,
} from '../models';
import { Observable } from 'rxjs';
import { API_URL } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class FacebookService {
  constructor(private http: HttpClient) {}

  getPostDetail(id: string): Observable<FacebookPost> {
    return this.http.get<FacebookPost>(`${API_URL}/facebook/post/${id}`);
  }

  getComments(id: string): Observable<FacebookComment[]> {
    return this.http.get<FacebookComment[]>(
      `${API_URL}/facebook/comments/${id}`,
    );
  }

  getReacts(id: string): Observable<FacebookReact[]> {
    return this.http.get<FacebookReact[]>(
      `${API_URL}/facebook/reactions/${id}`,
    );
  }
}
