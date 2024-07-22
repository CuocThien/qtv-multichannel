import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { API_URL } from '../../../environments/environment.prod';
import {
  HttpClient,
  HttpHeaders,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(query: any): Observable<Post[]> {
    return this.http.get<Post[]>(`${API_URL}/articles`, { params: query });
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${API_URL}/article/${id}`);
  }

  uploadImages(formData: FormData): Observable<any> {
    return this.http
      .post(`${API_URL}/uploads`, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          if (event.type === HttpEventType.Response) return event.body;
          return;
        }),
        catchError(this.handleError),
      );
  }

  createPost(body: any) {
    return this.http.post(`${API_URL}/article`, body);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('File upload error', error);
    return throwError(error);
  }
}
