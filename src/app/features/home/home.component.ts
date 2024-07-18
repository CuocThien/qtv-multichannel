import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services';
import { Post } from '../../core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    // this.postService.getPosts().subscribe((data: Post[]) => {
    this.posts = this.postService.getPosts();
  }
  viewPost(postId: number): void {
    this.router.navigate(['/post', postId]);
  }
}
