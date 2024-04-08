import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  addPostForm!: FormGroup;
  categories = [];

  constructor(private fb: FormBuilder) {
    this.addPostForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onAddPost() { }

  fieldChange(e: any) { }

  fileChangeHandler(e: any) { }

}
