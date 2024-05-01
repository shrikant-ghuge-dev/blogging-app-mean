import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../Services/admin.service';

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

  constructor(private adminService: AdminService, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      this.userId = params.get('id');
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
    this.getUserData();
    });
  }

  getUserData() {
    this.adminService.getUserProfile(this.userId).subscribe((res: any) => {
      this.userData = res.data[0];
    })
  }

}
