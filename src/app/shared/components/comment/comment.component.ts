import { Component, OnInit, Input } from '@angular/core';
import { FacebookComment } from '../../../core/models';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: FacebookComment;

  constructor() {}

  ngOnInit(): void {}
}
