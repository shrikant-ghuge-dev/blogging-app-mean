import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  resetPassword(data: any): Observable<any> {
    return this.http.post('http://localhost:3300/api/v1/auth/reset-password', data)
  }
}
