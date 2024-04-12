import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NgIf, NgClass, NgStyle, RouterModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {
  isSidePanelOpen: boolean = true;

  toggleSidePanel(): void {
    this.isSidePanelOpen = !this.isSidePanelOpen;
  }

}
