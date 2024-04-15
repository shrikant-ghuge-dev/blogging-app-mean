import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: any;
  userId: any;
  loggedInUserId: any;
  isUpdateUserPopupVisible: boolean = false;
  updateUserForm!: FormGroup;

  constructor(private userService: UserService, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService) {
    this.updateUserForm = this.fb.group({
      name: ['', Validators.required],
      about: ['', Validators.required],
      // image: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    })
  }

  ngOnInit(): void {
    this.getUserDetails();

    this.loggedInUserId = this.userService.getLoggedInUserId()
  }

  getUserDetails() {
    this.userService.getUserProfile(this.userId).subscribe((res: any) => {
      this.user = res?.data[0];
    });
  }

  togglePopup() {
    this.isUpdateUserPopupVisible = !this.isUpdateUserPopupVisible;
  }

  OnUpdateBtn() {
    this.isUpdateUserPopupVisible = true;
    this.updateUserForm.patchValue({
      name: this.user.name,
      about: this.user.about
    });
  }

  onUpdateUser() {
    this.userService.updateUser(this.userId, this.updateUserForm.value).subscribe((res:any) => {
      this.getUserDetails();
      this.isUpdateUserPopupVisible = false;
      this.toastr.success(res?.message, "Success");
    }, error => {
      this.toastr.error(error?.error?.message, "Error");
    })
   }

}
