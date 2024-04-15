import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem("User") || '';
  if (JSON.parse(user).role === 'Admin') {
    return true;
  } else {
    return inject(Router).createUrlTree(['/home']);
  }
};
