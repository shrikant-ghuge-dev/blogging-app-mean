import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgClass, NgStyle, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isSidePanelOpen: boolean = true;

  toggleSidePanel(): void {
    this.isSidePanelOpen = !this.isSidePanelOpen;
  }

}
