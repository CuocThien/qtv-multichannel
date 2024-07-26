import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment, ZaloPost } from '../models';
import { Observable } from 'rxjs';
import { API_URL } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ZaloService {
  constructor(private http: HttpClient) {}

  getPostDetail(id: string): Observable<ZaloPost> {
    return this.http.get<ZaloPost>(`${API_URL}/zalo/${id}`);
  }
}
