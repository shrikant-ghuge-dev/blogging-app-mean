import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(signInData: any) {
    return this.http.post('http://localhost:3300/api/v1/auth/login', signInData);
  }

  signUp(signUpData: any) {
    return this.http.post('http://localhost:3300/api/v1/auth/register', signUpData);
  }
}
