import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserProfile(userId: any) {
    return this.http.get(`http://localhost:3300/api/v1/user/${userId}`);
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
}
