import { Component, OnInit } from '@angular/core';
import { InstagramService } from '../../core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookComment, InstagramPost } from '../../core/models';
import { isEmpty } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (!postId) {
      this.router.navigate(['/home']);
      return;
    }
    this.spinner.show();
    this.instaService.getPostDetail(postId).subscribe(
      (response: any) => {
        if (!isEmpty(response)) {
          this.postDetail = response.data;
          const comments = this.postDetail.comments?.data;
          if (isEmpty(comments)) {
            this.spinner.hide();
            return;
          }
          this.comments = comments.map((comment) => {
            const { username, text } = comment;
            return {
              id: username,
              message: text,
              created_time: '',
            };
          });
          this.spinner.hide();
        }
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      },
    );
  }
}
