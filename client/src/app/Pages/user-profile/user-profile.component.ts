import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: any;
  userId: any;
  loggedInUserId: any;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    })
  }

  ngOnInit(): void {
    this.userService.getUserProfile(this.userId).subscribe((res: any) => {
      this.user = res?.data[0];
    });

    this.loggedInUserId = this.userService.getLoggedInUserId()
    console.log(this.loggedInUserId)
  }

}
