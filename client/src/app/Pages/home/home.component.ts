import { Component } from '@angular/core';
import { CategorySideMenuComponent } from '../../Components/category-side-menu/category-side-menu.component';
import { NewFeedComponent } from '../../Components/new-feed/new-feed.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategorySideMenuComponent, NewFeedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
