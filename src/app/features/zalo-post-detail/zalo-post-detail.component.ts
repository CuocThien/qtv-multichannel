import { Component } from '@angular/core';
import { ZaloService } from '../../core/services/zalo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { ZaloPost } from '../../core/models';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    this.spinner.show();
    if (!postId) {
      this.router.navigate(['/home']);
      return;
    }

    this.zaloService.getPostDetail(postId).subscribe(
      (response: any) => {
        if (!isEmpty(response)) {
          this.postDetail = response.data;
          this.spinner.hide();
        }
      },
      (error) => {
        this.spinner.show();
      },
    );
  }
}
