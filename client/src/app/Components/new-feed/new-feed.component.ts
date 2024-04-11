import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../Services/post.service';
import { NgFor, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../Services/common.service';

@Component({
  selector: 'app-new-feed',
  standalone: true,
  imports: [PostComponent, NgIf, NgFor],
  templateUrl: './new-feed.component.html',
  styleUrl: './new-feed.component.scss'
})
export class NewFeedComponent implements OnInit {
  posts = [];

  constructor(private postService: PostService, private toastr: ToastrService, private commonService: CommonService) { }
  ngOnInit() {
    this.getAllPost('', '');

    this.commonService.searchTextSubject$.subscribe(searchTxt => {
      this.getAllPost(searchTxt, '');
    });

    this.commonService.categoryPostsFilterSubject$.subscribe(catId => {
      console.log(catId)
      this.getAllPost('', catId)
    })
  }

  getAllPost(searchTxt: string, catId:string) {
    this.postService.getAllPosts(searchTxt, catId).subscribe((res: any) => {
      this.posts = res?.data;
    });
  }

  // getAllPostByCat(catId: string) {
  //   this.postService.getAllPosts(searchTxt).subscribe((res: any) => {
  //   this.posts = this.posts.filter((item:any) => item?.categoryId?._id === catId);
  //   });
  // }

  deleteHandlers(postId: any) {
    this.postService.deletePost(postId).subscribe((res: any) => {
      this.toastr.success(res?.message, "success");
      this.posts = this.posts.filter((post: any) => post?._id !== postId)
    })
  }

}
