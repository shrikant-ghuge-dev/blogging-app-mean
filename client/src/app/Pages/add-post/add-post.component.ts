import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuillConfigModule, QuillModule } from 'ngx-quill';
import { CategoryService } from '../../Services/category.service';
import { NgFor } from '@angular/common';
import { PostService } from '../../Services/post.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, QuillModule,
    QuillConfigModule, NgFor],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  addPostForm!: FormGroup;
  categories!: any[];
  categoryId!: string;
  userId!: string;

  constructor(private fb: FormBuilder, private catService: CategoryService, private userService: UserService, private postService: PostService, private toastr: ToastrService) {
    this.addPostForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.catService.getAllCategories().subscribe((res: any) => {
      this.categories = res.data;
    })

      this.userId = this.userService.getLoggedInUserId();
  }

  onAddPost() {
    this.postService.addPost(this.userId, this.categoryId, this.addPostForm.value).subscribe((res: any) => {
      this.toastr.success(res?.message, "success");
      this.addPostForm.reset();
    }, error => {
      this.toastr.error(error.error.message, "error");
    })
  }

  fieldChange(e: any) {
    this.categoryId = e.target.value;
  }

  fileChangeHandler(e: any) { }

}
