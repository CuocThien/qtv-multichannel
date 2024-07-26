import { Component, OnInit } from '@angular/core';
import { InstagramService } from '../../core/services';
import { ActivatedRoute } from '@angular/router';
import { FacebookComment, InstagramPost } from '../../core/models';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-instagram-post-detail',
  templateUrl: './instagram-post-detail.component.html',
  styleUrl: './instagram-post-detail.component.scss',
})
export class InstagramPostDetailComponent implements OnInit {
  postDetail!: InstagramPost;
  comments: FacebookComment[] = [];
  constructor(
    private instaService: InstagramService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (!postId) return;
    this.instaService.getPostDetail(postId).subscribe(
      (response: any) => {
        if (!isEmpty(response)) {
          this.postDetail = response.data;
          const comments = this.postDetail.comments.data;
          if (isEmpty(comments)) return;
          this.comments = comments.map((comment) => {
            const { username, text } = comment;
            return {
              id: username,
              message: text,
              created_time: '',
            };
          });
        }
      },
      (error) => {},
    );
  }
}
