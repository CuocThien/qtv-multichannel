import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../core/services';
import { Comment } from '../../core/models';
@Component({
  selector: 'app-facebook-post-detail',
  templateUrl: './facebook-post-detail.component.html',
  styleUrl: './facebook-post-detail.component.scss',
})
export class FacebookPostDetailComponent implements OnInit {
  comments: Comment[] = [];
  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.comments = this.commentService.getComments();
    // this.commentService.getComments().subscribe((data: Comment[]) => {
    //   this.comments = data;
    // });
  }
}
