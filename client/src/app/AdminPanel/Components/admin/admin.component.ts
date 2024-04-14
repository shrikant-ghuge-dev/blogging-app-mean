import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgClass, NgStyle, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isSidePanelOpen: boolean = true;
  user: any;

  constructor(private userService: UserService) {
    this.user = this.userService.getLoggedInUser();
  }

  toggleSidePanel(): void {
    this.isSidePanelOpen = !this.isSidePanelOpen;
  }

}
