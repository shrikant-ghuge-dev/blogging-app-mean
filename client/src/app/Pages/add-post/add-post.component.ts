import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { QuillConfigModule, QuillModule } from 'ngx-quill';
import { CategoryService } from '../../Services/category.service';
import { CommonModule } from '@angular/common';
import { PostService } from '../../Services/post.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { QuillConfigModule, QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,
    QuillConfigModule, QuillModule
  ],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  addPostForm!: FormGroup;
  categories!: any[];
  categoryId!: string;
  userId!: string;
  image!: File;
  postId!: string;
  postDetails: any;
  @ViewChild('editor') editor: any;

  name = 'Angular';
  modules = {
    formula: true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['formula'],
      ['image', 'code-block']
    ]
  };

  constructor(private fb: FormBuilder, private catService: CategoryService, private userService: UserService,
    private postService: PostService, private toastr: ToastrService, private route: ActivatedRoute) {
    this.addPostForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      categoryName: ['', Validators.required],
    });

    this.route.queryParams.subscribe(params => {
      this.postId = params['id'];
      this.getPostData(this.postId);
    })
  }

  ngOnInit(): void {
    this.catService.getAllCategories().subscribe((res: any) => {
      this.categories = res.data;
    })

    this.userId = this.userService.getLoggedInUserId();
  }

  onAddPost() {
    const formData = new FormData();
    formData.append('title', this.addPostForm.controls['title'].value);
    formData.append('content', this.addPostForm.controls['content'].value);
    formData.append('categoryName', this.addPostForm.controls['categoryName'].value);
    formData.append('image', this.image);

    if (this.postId) {
      this.postService.updatePost(this.postId, formData).subscribe((res: any) => {
        this.toastr.success(res?.message, "Success");
        this.addPostForm.reset();
      }, error => {
        this.toastr.error(error.error.message, "Error");
      })
    } else {
      this.postService.addPost(this.userId, this.categoryId, formData).subscribe((res: any) => {
        this.toastr.success(res?.message, "Success");
        this.addPostForm.reset();
      }, error => {
        this.toastr.error(error.error.message, "Error");
      })
    }

  }

  getPostData(postId: string) {
    this.postService.getPostDetails(postId).subscribe((res: any) => {
      this.postDetails = res?.data?.post;
      this.addPostForm.patchValue({
        title: this.postDetails.title,
        content: this.postDetails.content,
        categoryName: this.postDetails?.categoryId?._id
      })
    })
  }

  fieldChange(e: any) {
    this.categoryId = e.target.value;
  }

  fileChangeHandler(e: any) {
    this.image = e.target.files[0];
  }

}
