import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services';
import { Post } from '../../core/models';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { isEmpty } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  pageIndex = 1;
  pageSize = 6;
  total = this.posts.length;
  query: any;

  constructor(
    private postService: PostService,
    private router: Router,
    private msg: NzMessageService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {}

  private _getPosts(query: any) {
    this.spinner.show();
    this.postService.getPosts(query).subscribe(
      (response: any) => {
        if (!isEmpty(response)) {
          this.posts = response.data.result;
          this.total = response.data.total;
          this.pageIndex = query.page;
          this.pageSize = query.limit;
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: query,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
          });
          this.spinner.hide();
        }
      },
      (error) => {
        this.msg.error(error.error.message);
        this.spinner.hide();
      },
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((query) => {
      if (!isEmpty(query)) {
        this.query = query;
        this._getPosts(this.query);
        return;
      }
      this.query = { page: 1, limit: 6 };
      this._getPosts(this.query);
    });
  }

  viewPost(postId: string): void {
    this.router.navigate(['/post', postId]);
  }

  newPost(): void {
    this.router.navigate(['/create-post']);
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    this._getPosts({ page: this.pageIndex, limit: this.pageSize });
  }
}
