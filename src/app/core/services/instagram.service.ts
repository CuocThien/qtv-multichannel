import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InstagramPost } from '../models';
import { Observable } from 'rxjs';
import { API_URL } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class InstagramService {
  constructor(private http: HttpClient) {}

  getPostDetail(id: string): Observable<InstagramPost> {
    return this.http.get<InstagramPost>(`${API_URL}/instagram/post/${id}`);
  }
}
