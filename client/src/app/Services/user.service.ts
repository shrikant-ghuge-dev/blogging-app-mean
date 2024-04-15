import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserProfile(userId: any) {
    return this.http.get(`${environment.baseUrl}/api/v1/user/${userId}`);
  }

  getAllUsers() {
    return this.http.get(`${environment.baseUrl}/api/v1/admin/users`);
  }

  deleteUser(userId:any) {
    return this.http.delete(`${environment.baseUrl}/api/v1/admin/user/${userId}`);
  }

  updateUser(userId: any, userData:any) {
    return this.http.patch(`${environment.baseUrl}/api/v1/user/${userId}`, userData);
  }

  userActivateDeactivate(userId: any, status:any) {
    return this.http.put(`${environment.baseUrl}/api/v1/admin/user/${userId}/status`, status);
  }

  getLoggedInUserId() {
    const userDataString = localStorage.getItem("User");
    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);
      return userData._id || '';
    } else {
      return '';
    }
  }

  getLoggedInUser() {
    const userDataString = localStorage.getItem("User");
    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);
      return userData;
    } else {
      return '';
    }
  }

  isAdmin() {
    const userDataString = localStorage.getItem("User");
    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);
      return (userData.role === 'Admin') ? true : false;
    } else {
      return false;
    }
  }
}
