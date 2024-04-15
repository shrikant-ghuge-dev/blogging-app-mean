import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { AuthService } from '../../../Services/auth.service';
import { SidePanelComponent } from '../side-panel/side-panel.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, SidePanelComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isSidePanelOpen: boolean = true;
  user: any;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.user = this.userService.getLoggedInUser();
  }

  toggleSidePanel(): void {
    this.isSidePanelOpen = !this.isSidePanelOpen;
  }

  doLogout(): void {
    localStorage.removeItem('User');
    localStorage.removeItem('Token');
    this.authService.logout();
    this.router.navigate(['/signin'])
  }

}
