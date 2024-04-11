import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get('http://localhost:3300/api/v1/post');
  }

  addPost(userId: string, catId: string, postData: any) {
    return this.http.post(`http://localhost:3300/api/v1/post/user/${userId}/category/${catId}/posts`, postData);
  }

  deletePost(postId: any) {
    return this.http.delete(`http://localhost:3300/api/v1/post/${postId}`);
  }

  getPostDetails(postId: any) {
    return this.http.get(`http://localhost:3300/api/v1/post/${postId}`);
  }

  addCommentOnPost(postId: any, comment: any) {
    return this.http.post(`http://localhost:3300/api/v1/post/${postId}/comments`, comment);
  }
}
