import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../Services/common.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  userData: any;
  isLoggedIn: boolean = false;
  searchText: string = '';
  private authSubscription!: Subscription;

  constructor(public authService: AuthService, private router: Router, private commonService: CommonService) {
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      return
    }
    // Subscribe to authentication state changes
    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });

    // Check if user is already authenticated on component initialization
    const userDataString = localStorage.getItem('User');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
      this.isLoggedIn = true;
    }
  }

  doLogout(): void {
    localStorage.removeItem('User');
    localStorage.removeItem('Token');
    this.authService.logout();
    this.isLoggedIn = false;
  }

  onSearch() {
    this.commonService.searchText(this.searchText);
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
