import { CanActivateFn } from '@angular/router';

export const clientAuthGuard: CanActivateFn = (route, state) => {
  return true;
};
