import { Component, OnInit } from '@angular/core';
import { PostService } from '../../Services/post.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, FormsModule, RouterModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {
  postId: any;
  postDetails: any;
  comments: any;
  userComment: string = '';

  constructor(private postService: PostService, private route: ActivatedRoute, private toastr: ToastrService) {
    this.route.paramMap.subscribe(params => {
      // Get the dynamic segment from the route parameters
      this.postId = params.get('id');
    });
  }

  ngOnInit(): void {
    this.postService.getPostDetails(this.postId).subscribe((res: any) => {
      this.postDetails = res?.data?.post;
      this.comments = res?.data?.comments;
    })
  }

  submitComment() {
    if (!this.userComment) return;

    const payload = {
      comment: this.userComment
    }
    this.postService.addCommentOnPost(this.postId, payload).subscribe((res: any) => {
      this.comments.push(payload);
      this.toastr.info(res?.message, "success");
      this.userComment = '';
    })
  }

  getImageUrl(imageName: string): string {
    // Check if imageName exists
    if (imageName) {
      const parts = imageName.split('\\');
      console.log(`http://localhost:3300/${parts[1]}`)
      // Return the full URL
      return `http://localhost:3300/${parts[1]}`;
    }
    return '';
  }
}