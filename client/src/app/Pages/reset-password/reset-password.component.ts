import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    // this.route.paramMap.subscribe(params => {
    //   // Get the dynamic segment from the route parameters
    //   this.token = params.get('token');
    // });

    this.route.queryParamMap.subscribe(params => {
      // Get the dynamic segment from the route parameters
      this.token = params.get('token');
    });
  }

  submitHandler() {
    const payload = {
      password: this.resetForm.controls['password'].value,
      token: this.token
    };
    this.authService.resetPassword(payload).subscribe(res => {
      this.router.navigate(['/signin'])
    })
  }

}
