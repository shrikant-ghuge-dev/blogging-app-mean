import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  // Categories
  getAllCategories() {
    return this.http.get(`${environment.baseUrl}/api/v1/admin/category`);
  }

  deleteCategory(catId: any) {
    return this.http.delete(`${environment.baseUrl}/api/v1/admin/category/${catId}`);
  }

  addCategory(catDetails: any) {
    return this.http.post(`${environment.baseUrl}/api/v1/admin/category`, catDetails);
  }

  // Posts
  deletePostByAdmin(postId: any) {
    return this.http.delete(`${environment.baseUrl}/api/v1/admin/post/${postId}`);
  }

  getAllPosts(searchTxt?: string | '', catId?: string | ''): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/admin/post?searchTerm=${searchTxt}&catId=${catId}`);
  }

  // Users
  getAllUsers() {
    return this.http.get(`${environment.baseUrl}/api/v1/admin/users`);
  }

  deleteUser(userId: any) {
    return this.http.delete(`${environment.baseUrl}/api/v1/admin/user/${userId}`);
  }

  userActivateDeactivate(userId: any, status: any) {
    return this.http.put(`${environment.baseUrl}/api/v1/admin/user/${userId}/status`, status);
  }

  getUserProfile(userId: any) {
    return this.http.get(`${environment.baseUrl}/api/v1/admin/user/${userId}`);
  }
}
