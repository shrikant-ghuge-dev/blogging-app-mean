import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

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
  userProfile!: any;
  imagePreview: string | ArrayBuffer | null = null;
  showUploadIcon: boolean = true;

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
    const formData = new FormData();
    formData.append('title', this.updateUserForm.controls['name'].value);
    formData.append('content', this.updateUserForm.controls['about'].value);
    formData.append('image', this.userProfile);

    this.userService.updateUser(this.userId, formData).subscribe((res: any) => {
      this.getUserDetails();
      this.isUpdateUserPopupVisible = false;
      this.toastr.success(res?.message, "Success");
    }, error => {
      this.toastr.error(error?.error?.message, "Error");
    })
  }

  fileChangeHandler(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.userProfile = fileInput.files?.[0];

    if (this.userProfile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.showUploadIcon = false;
      };
      reader.readAsDataURL(this.userProfile);
    }
  }

  getImageUrl(imageName: string): string {
    if (imageName) {
      const parts = imageName.split('\\');
      return `${environment.baseUrl}/${parts[1]}`;
    }
    return `${environment.baseUrl}/2024-05-01_120225profile.png`;
  }

}
