import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state): boolean => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const isLoggedIn: boolean = authService.isLoggedIn();

  if (!isLoggedIn) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
