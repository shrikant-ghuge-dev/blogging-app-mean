import { Component } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationPopupComponent } from '../../Components/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ConfirmationPopupComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  userList: any = [];
  userId: any;
  isPopupVisible: boolean = false;
  textMsg = "";

  constructor(private userService: UserService, private toastr: ToastrService) {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.userList = res?.data;
    })
  }

  deleteUserIconClicked(userId: any) {
    this.userId = userId;
    this.isPopupVisible = true;
  }

  onDeleteUser() {
    this.userService.deleteUser(this.userId).subscribe((res: any) => {
      this.userList = this.userList.filter((user: any) => user._id !== this.userId);
      this.isPopupVisible = false;
      this.toastr.success(res?.message, 'Success')
    });
  }

  updateUser(user: any) {
    this.userService.userActivateDeactivate(user._id, { active: true }).subscribe((res:any) => {
      this.toastr.success(res?.message, 'Success')
    }, error => {
      this.toastr.error(error?.error?.message, 'Error')
    })
  }

  cancelBtnClick() {
    this.isPopupVisible = false;
  }

}
