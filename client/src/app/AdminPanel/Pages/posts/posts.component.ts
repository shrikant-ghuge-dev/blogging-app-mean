import { Component } from '@angular/core';
import { PostService } from '../../../Services/post.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationPopupComponent } from '../../Components/confirmation-popup/confirmation-popup.component';
import { AdminService } from '../../Services/admin.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, ConfirmationPopupComponent, RouterModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  postList: any = [];
  postId: any;
  isPopupVisible: boolean = false;
  textMsg = "";

  constructor(private adminService: AdminService, private toastr: ToastrService) {
    this.adminService.getAllPosts('', '').subscribe((res: any) => {
      this.postList = res?.data;
    })
  }

  deletePost(postId: any) {
    this.postId = postId;
    this.isPopupVisible = true;
  }

  onDeletePost() {
    this.adminService.deletePostByAdmin(this.postId).subscribe((res: any) => {
      this.postList = this.postList.filter((post: any) => post._id !== this.postId);
      this.isPopupVisible = false;
      this.toastr.success(res?.message, 'Success')
    })
  }

  cancelBtnClick() {
    this.isPopupVisible = false;
  }
}
