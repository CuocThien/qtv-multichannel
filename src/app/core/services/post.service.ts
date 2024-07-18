import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'https://api.example.com/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    // : Observable<Post[]> {
    // return this.http.get<Post[]>(this.apiUrl);
    return [
      {
        id: 1,
        title: 'Mountain Sunset',
        description: 'A breathtaking view of the mountains during sunset.',
        cover:
          'https://plus.unsplash.com/premium_photo-1674500770416-028ec5fe4853?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        image:
          'https://plus.unsplash.com/premium_photo-1674500770416-028ec5fe4853?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 2,
        title: 'City Lights',
        description: 'The city skyline beautifully lit up at night.',
        cover:
          'https://images.unsplash.com/photo-1508935685407-6262a7056494?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        image:
          'https://images.unsplash.com/photo-1508935685407-6262a7056494?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 3,
        title: 'Beach Paradise',
        description:
          'A serene beach with crystal clear water and white sand.A serene beach with crystal clear water and white sand.A serene beach with crystal clear water and white sand.A serene beach with crystal clear water and white sand.A serene beach with crystal clear water and white sand.',
        cover:
          'https://plus.unsplash.com/premium_photo-1719955779443-4c22893486ab?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        image:
          'https://plus.unsplash.com/premium_photo-1719955779443-4c22893486ab?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 4,
        title: 'Serene Beach at Sunset',
        description:
          'The calm waves gently lap against the shore while the sky is painted in stunning hues of orange and pink.',
        cover:
          'https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        image:
          'https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ];
  }

  getPost(id: number) {
    // : Observable<Post> {
    return {
      id,
      title: 'Serene Beach at Sunset',
      description:
        'The calm waves gently lap against the shore while the sky is painted in stunning hues of orange and pink.',
      cover:
        'https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      image:
        'https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    };
    // return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }
}
