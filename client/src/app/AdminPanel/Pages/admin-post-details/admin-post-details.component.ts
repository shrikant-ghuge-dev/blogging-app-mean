import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmationPopupComponent } from '../../Components/confirmation-popup/confirmation-popup.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-post-details',
  standalone: true,
  imports: [CommonModule, ConfirmationPopupComponent],
  templateUrl: './admin-post-details.component.html',
  styleUrl: './admin-post-details.component.scss'
})
export class AdminPostDetailsComponent implements OnInit {
  postDetails: any;
  postId:any;
  commentList:any = [];
  textMsg!:string;
  isPopupVisible:boolean = false;
  commentId:any;

  constructor(private adminService: AdminService, private route: ActivatedRoute, private toastr: ToastrService) {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('id');
    });
  }

  ngOnInit(): void {
    this.adminService.getPostDetails(this.postId).subscribe((res: any) => {
      this.postDetails = res?.data;
      this.commentList = res?.data?.comments;
    })
  }

  deleteComment(commentId: any) {
    this.commentId = commentId;
    this.isPopupVisible = true;
  }

  onDeleteComment() {
    this.adminService.deleteComment(this.commentId).subscribe((res:any) => { 
      this.commentList = this.commentList.filter((comment: any) => comment._id !== this.commentId);
      this.isPopupVisible = false;
      this.toastr.success(res?.message, 'Success')
    })
  }

  cancelBtnClick() {
    this.isPopupVisible = false;
  }

}
