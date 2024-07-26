import { Component } from '@angular/core';
import { ZaloService } from '../../core/services/zalo.service';
import { ActivatedRoute } from '@angular/router';
import { isEmpty } from 'lodash';
import { ZaloPost } from '../../core/models';

@Component({
  selector: 'app-zalo-post-detail',
  templateUrl: './zalo-post-detail.component.html',
  styleUrl: './zalo-post-detail.component.scss',
})
export class ZaloPostDetailComponent {
  postDetail!: ZaloPost;
  constructor(
    private zaloService: ZaloService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (!postId) return;
    this.zaloService.getPostDetail(postId).subscribe(
      (response: any) => {
        if (!isEmpty(response)) {
          this.postDetail = response.data;
          console.log(
            '🐼 => ZaloPostDetailComponent => this.postDetail:',
            this.postDetail,
          );
        }
      },
      (error) => {},
    );
  }
}
