import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../core/services';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Post } from '../../core/models';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private modal: NzModalService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    this.spinner.show();
    if (!postId) {
      this.router.navigate(['/home']);
      return;
    }
    this.postService.getPost(postId).subscribe(
      (response: any) => {
        if (response) {
          this.post = response.data;
          this.msg.success(response.message);
          this.spinner.hide();
        }
      },
      (error) => {
        this.msg.error(error.error.message);
        this.spinner.hide();
      },
    );
  }

  socialPostDetail(platform: string): void {
    switch (platform) {
      case 'facebook':
        this.router.navigate([`post/fb/${this.post.facebookPostId}`]);
        break;
      case 'instagram':
        this.router.navigate([`post/instagram/${this.post.instagramPostId}`]);
        break;
      case 'zalo':
        this.router.navigate([`post/zalo/${this.post.zaloPostId}`]);
        break;
      default:
        return;
    }
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc muốn xóa bài đăng này không?',
      nzContent: '<b style="color: red;">Hành động này không thể hoàn tác</b>',
      nzOkText: 'Có',
      nzOkDanger: true,
      nzOnOk: () => this.deletePost(),
      nzCancelText: 'Không',
      nzOnCancel: () => console.log('Hủy bỏ'),
    });
  }

  deletePost() {
    this.msg.success('delete successfully');
  }
}
