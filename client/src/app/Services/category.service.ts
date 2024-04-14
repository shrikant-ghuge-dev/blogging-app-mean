import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get(`${environment.baseUrl}/api/v1/category`);
  }

  deleteCategory(catId: any) {
    return this.http.delete(`${environment.baseUrl}/api/v1/admin/category/${catId}`);
  }

  addCategory(catDetails: any) {
    return this.http.post(`${environment.baseUrl}/api/v1/admin/category`, catDetails);
  }
}
