import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../core/services';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Post } from '../../core/models';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  post!: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (!postId) return;
    this.postService.getPost(postId).subscribe(
      (response: any) => {
        if (response) {
          this.post = response.data;
          this.msg.success(response.message);
        }
      },
      (error) => {
        this.msg.error(error.error.message);
      },
    );
  }

  socialPostDetail(platform: string): void {
    switch (platform) {
      case 'facebook':
        this.router.navigate([`post/fb/${this.post.facebookPostId}`]);
        break;
      default:
        return;
    }
  }
}
