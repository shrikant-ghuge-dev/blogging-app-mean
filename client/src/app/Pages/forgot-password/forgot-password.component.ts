import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgetForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  submitHandler() {
    this.authService.forgetPassword(this.forgetForm.value).subscribe((res:any) => {
      this.toastr.success(res?.message, "Success");
      this.forgetForm.reset();
    }, error => {
      this.toastr.error(error?.error?.message, "Error");
    })
   }
}
