import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  signInForm!: FormGroup;
  private accessTokenExpiration!: number;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  submitHandler() {
    this.authService.signIn(this.signInForm.value).subscribe((res: any) => {
      localStorage.setItem("Token", res.token)
      localStorage.setItem("User", JSON.stringify(res.user))
      this.authService.checkAuthenticated();
      this.authService.verifyRoleAndNavigate(res.token);
      this.toastr.success(res?.message, "Success");
      this.accessTokenExpiration = res.expires_in; // Expiration time in seconds
      this.startSessionTimer();
    }, error => {
      this.toastr.error(error?.error?.message, 'Error')
    })
  }

  startSessionTimer() {
    const expirationTime = this.accessTokenExpiration * 1000; // Convert seconds to milliseconds
    setTimeout(() => {
      this.doLogout();
    }, expirationTime);
  }

  doLogout(): void {
    localStorage.removeItem('User');
    localStorage.removeItem('Token');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
