import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // private isAuthenticated: boolean = false;
  isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticated.asObservable();

  // isAuthenticated$ = this.isAuthenticated.asObservable();
  // private userName: string | null = null;

  constructor(private http: HttpClient) { }

  signIn(signInData: any) {
    return this.http.post(`${environment.baseUrl}/api/v1/auth/login`, signInData);
  }

  signUp(signUpData: any) {
    return this.http.post(`${environment.baseUrl}/api/v1/auth/register`, signUpData);
  }

  forgetPassword(forgetData: any) {
    return this.http.post(`${environment.baseUrl}/api/v1/auth/forgot-password`, forgetData);
  }

  resetPassword(resetData: any) {
    return this.http.post(`${environment.baseUrl}/api/v1/auth/reset-password`, resetData);
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    // Assuming you have an API endpoint for login
    return this.http.post<any>('your-api-url/login', credentials);
  }

  logout(): void {
    // Clear authentication state and any other relevant data
    localStorage.removeItem('User');
    localStorage.removeItem('Token');
    this.isAuthenticated.next(false);
    // Optionally perform additional cleanup tasks
  }

  checkAuthenticated(): void {
    // Check if user is authenticated based on presence of token in localStorage
    const token = localStorage.getItem('Token');
    const isAuthenticated = !!token;
    this.isAuthenticated.next(isAuthenticated);
  }

  // login(userName: string): void {
  //   this.isAuthenticated = true;
  //   this.userName = userName;

  //   this.isAuthenticatedUser(JSON.stringify(this.isAuthenticated));
  // }

  // logout(): void {
  //   this.isAuthenticated = false;
  //   this.userName = null;
  //   this.isAuthenticatedUser(JSON.stringify(this.isAuthenticated));
  // }

  // isAuthenticatedUser(isAuthenticated: any): boolean {
  //   localStorage.setItem("isAuthenticatedUser", isAuthenticated)
  //   return this.isAuthenticated;
  // }

  // getUserName(): string | null {
  //   return this.userName;
  // }
}
