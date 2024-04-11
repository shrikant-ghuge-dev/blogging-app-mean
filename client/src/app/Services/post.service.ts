import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get(`${environment.baseUrl}/api/v1/post`);
  }

  addPost(userId: string, catId: string, postData: any) {
    return this.http.post(`${environment.baseUrl}/api/v1/post/user/${userId}/category/${catId}/posts`, postData);
  }

  deletePost(postId: any) {
    return this.http.delete(`${environment.baseUrl}/api/v1/post/${postId}`);
  }

  getPostDetails(postId: any) {
    return this.http.get(`${environment.baseUrl}/api/v1/post/${postId}`);
  }

  addCommentOnPost(postId: any, comment: any) {
    return this.http.post(`${environment.baseUrl}/api/v1/post/${postId}/comments`, comment);
  }
}
