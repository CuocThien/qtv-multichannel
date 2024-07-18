import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../core/services';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  post: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (!postId) return;
    this.post = this.postService.getPost(+postId);
  }
}
