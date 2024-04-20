import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit{
  userData: any;
  userId: any;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      this.userId = params.get('id');
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserProfile(this.userId).subscribe((res: any) => {
      this.userData = res.data[0];
    })
  }

}
