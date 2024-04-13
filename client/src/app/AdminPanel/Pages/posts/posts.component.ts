import { Component } from '@angular/core';
import { PostService } from '../../../Services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  postList: any = [];

  constructor(private postService: PostService) {
    this.postService.getAllPosts('', '').subscribe((res: any) => {
      this.postList = res?.data;
    })
  }
}
