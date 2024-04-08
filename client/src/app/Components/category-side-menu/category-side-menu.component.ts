import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../Services/category.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-category-side-menu',
  standalone: true,
  imports: [RouterModule, NgIf, NgFor],
  templateUrl: './category-side-menu.component.html',
  styleUrl: './category-side-menu.component.scss'
})
export class CategorySideMenuComponent implements OnInit {
  categories!: any;

  constructor(private catService: CategoryService) { }
  ngOnInit(): void {
    this.catService.getAllCategories().subscribe((res: any) => {
      this.categories = res.data;
    })
  }

}
