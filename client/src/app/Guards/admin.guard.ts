import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  // const userService = Inject(UserService);
  const user = localStorage.getItem("User") || '';
  if (JSON.parse(user).role === 'Admin') {
    return true;
  } else {
    // Redirect unauthorized users to sign-in or home page
    return inject(Router).createUrlTree(['/home']);
  }
};
