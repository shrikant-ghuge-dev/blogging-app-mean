import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../Services/post.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-new-feed',
  standalone: true,
  imports: [PostComponent, NgIf, NgFor],
  templateUrl: './new-feed.component.html',
  styleUrl: './new-feed.component.scss'
})
export class NewFeedComponent implements OnInit {
  posts = [];

  constructor(private postService: PostService) { }
  ngOnInit() {
    this.postService.getAllPosts().subscribe((res: any) => {
      this.posts = res?.data;
    })
  }

  deleteHandlers(e: any) { }

}
