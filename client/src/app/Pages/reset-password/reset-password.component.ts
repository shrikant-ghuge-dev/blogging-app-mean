import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;
  token: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token');
    });
  }

  submitHandler() {
    if (this.resetForm.controls['password'].value !== this.resetForm.controls['confirmPassword'].value) {
      this.toastr.error("Password mismatch!", "error");
      return;
    }
    const payload = {
      password: this.resetForm.controls['password'].value,
      token: this.token
    };
    this.authService.resetPassword(payload).subscribe(res => {
      this.router.navigate(['/signin'])
    }, error => {
      this.toastr.error(error?.error.message, "error");
    })
  }

}
