import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'https://api.example.com/comments';

  constructor(private http: HttpClient) {}

  getComments(): Comment[] {
    // : Observable<Comment[]> {
    return [
      {
        id: 1,
        author: 'Nguyễn Văn A',
        content: 'Đây là một bức ảnh tuyệt đẹp! Tôi thích màu sắc và tổng thể.',
      },
      {
        id: 2,
        author: 'Trần Thị B',
        content: 'Thật tuyệt vời! Hãy tiếp tục công việc tuyệt vời.',
      },
      {
        id: 3,
        author: 'Phạm Văn C',
        content: 'Bạn có thể chia sẻ nơi bạn chụp ảnh này không? Cảm ơn!',
      },
    ];
    // return this.http.get<Comment[]>(this.apiUrl);
  }
}
