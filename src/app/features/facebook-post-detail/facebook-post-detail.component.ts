import { Component, OnInit } from '@angular/core';
import { CommentService, FacebookService } from '../../core/services';
import { Comment, FacebookComment, FacebookPost } from '../../core/models';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-facebook-post-detail',
  templateUrl: './facebook-post-detail.component.html',
  styleUrl: './facebook-post-detail.component.scss',
})
export class FacebookPostDetailComponent implements OnInit {
  comments: FacebookComment[] = [];
  postDetail!: FacebookPost;
  constructor(
    private facebookService: FacebookService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {}

  async ngOnInit(): Promise<void> {
    const postId = this.route.snapshot.paramMap.get('id');

    this.spinner.show();
    if (!postId) {
      this.router.navigate(['/home']);

      return;
    }
    await Promise.all([
      this.facebookService.getPostDetail(postId).subscribe(
        (response: any) => {
          if (!isEmpty(response)) {
            this.postDetail = response.data;
          }
        },
        (error) => {},
      ),
      this.facebookService.getComments(postId).subscribe(
        (response: any) => {
          if (!isEmpty(response)) {
            this.comments = response.data;
          }
        },
        (error) => {},
      ),
      this.facebookService.getReacts(postId).subscribe(
        (response: any) => {
          if (!isEmpty(response)) {
            this.spinner.hide();
          }
        },
        (error) => {
          this.spinner.hide();
        },
      ),
    ]);
    // this.comments = this.commentService.getComments();
    // this.commentService.getComments().subscribe((data: Comment[]) => {
    //   this.comments = data;
    // });
  }
}
