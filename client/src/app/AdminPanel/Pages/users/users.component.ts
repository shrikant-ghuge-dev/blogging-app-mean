import { Component } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  userList:any = [];

  constructor(private userService: UserService) {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.userList = res?.data;
    })
  }

  deleteUser(userId: any) {
    console.log(userId)
  }

  updateUser(user:any) {}

}
