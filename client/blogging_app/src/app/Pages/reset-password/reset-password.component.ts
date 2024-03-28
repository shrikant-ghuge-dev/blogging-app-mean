import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  })
  token!: String;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;

    // Access query parameters using subscribe
    this.route.queryParams.subscribe(params => {
      // Use params object to access individual query parameters
      this.token = params['token'];
      console.log(this.token)
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.resetForm.value);
    const formData = {
      newPassword: this.resetForm.controls['password'].value,
      token: this.token
    }
    this.userService.resetPassword(formData).subscribe(res => console.log(res))
  }

}
