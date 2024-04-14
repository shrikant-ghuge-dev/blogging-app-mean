import { Component, OnInit } from '@angular/core';
import { PostService } from '../../Services/post.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { UserService } from '../../Services/user.service';

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

  constructor(private postService: PostService, private route: ActivatedRoute, private toastr: ToastrService, private userService: UserService) {
    this.route.paramMap.subscribe(params => {
      // Get the dynamic segment from the route parameters
      this.postId = params.get('id');
    });
  }

  ngOnInit(): void {
    this.postService.getPostDetails(this.postId).subscribe((res: any) => {
      this.postDetails = res?.data?.post;
      this.comments = res?.data?.comments;
    }, error => {
      this.toastr.error(error?.error?.message, 'Error')
    })
  }

  submitComment() {
    if (!this.userComment) return;

    const payload = {
      comment: this.userComment,
      userId: this.userService.getLoggedInUserId()
    }
    this.postService.addCommentOnPost(this.postId, payload).subscribe((res: any) => {
      this.comments.push(payload);
      this.toastr.success(res?.message, "success");
      this.userComment = '';
    })
  }

  getImageUrl(imageName: string): string {
    if (imageName) {
      const parts = imageName.split('\\');
      return `${environment.baseUrl}/${parts[1]}`;
    }
    return '';
  }
}
