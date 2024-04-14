import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../Services/category.service';
import { ConfirmationPopupComponent } from '../../Components/confirmation-popup/confirmation-popup.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ConfirmationPopupComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  catList: any = [];
  catId: any;
  isPopupVisible: boolean = false;
  isAddCatPopupVisible: boolean = false;
  textMsg = "";
  addCategoryForm!: FormGroup;

  constructor(private catService: CategoryService, private toastr: ToastrService, private fb: FormBuilder) {
    this.addCategoryForm = this.fb.group({
      categoryTitle: ['', Validators.required],
      categoryDescription: ['', Validators.required],
    })
    this.catService.getAllCategories().subscribe((res: any) => {
      this.catList = res?.data;
    })
  }

  deleteCategory(catId: any) {
    this.catId = catId;
    this.isPopupVisible = true;
  }

  onDeleteCategory() {
    this.catService.deleteCategory(this.catId).subscribe((res: any) => {
      this.catList = this.catList.filter((cat: any) => cat._id !== this.catId);
      this.isPopupVisible = false;
      this.toastr.success(res?.message, 'Success')
    })
  }

  addCategory() {
    this.isAddCatPopupVisible = true;
   }

  onAddCategory() {
    this.catService.addCategory(this.addCategoryForm.value).subscribe((res:any) => {
      this.isAddCatPopupVisible = false;
      this.catList.push({_id: res?.data?._id, categoryTitle: res?.data?.categoryTitle, categoryDescription: res?.data?.categoryDescription });
      this.toastr.success(res?.message, 'Success')
      this.addCategoryForm.reset();
    })
  }

  togglePopup() {
    this.isAddCatPopupVisible = false;
  }

  cancelBtnClick() {
    this.isPopupVisible = false;
  }
}
