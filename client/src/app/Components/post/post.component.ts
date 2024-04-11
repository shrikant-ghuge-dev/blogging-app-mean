import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../Services/post.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgIf],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  @Input() post: any;
  @Output() postId: EventEmitter<any> = new EventEmitter<any>();
  loggedUserId: any;

  constructor(private router: Router, private postService: PostService, private toastr: ToastrService, private userService: UserService) { }


  ngOnInit(): void {
    this.loggedUserId = this.userService.getLoggedInUserId();
  }

  deleteHandler(post: any) {
    this.postId.emit(post._id);
  }

  onReadMore(id: any) {
    this.router.navigate(['/blog', id])
  }

}
