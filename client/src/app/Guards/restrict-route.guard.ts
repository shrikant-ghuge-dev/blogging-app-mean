import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const restrictRouteGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem("User")) {
    return true;
  }

  return inject(Router).createUrlTree(['/signin']);
};
