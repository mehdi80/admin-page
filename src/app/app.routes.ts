import {Routes} from '@angular/router';

import {authGuard} from "./guards/auth.guard";


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shell/shell.component').then(sell => sell.ShellComponent),
    children: [
      {
        path: 'login',
        loadComponent:() => import('./components/login/login.component').then( login => login.LoginComponent),
        },
      {
        path: 'register',
        loadComponent: () => import('./components/register/register.component').then( register => register.RegisterComponent),
      },
      {
        path: 'admin',
        canActivate:[authGuard],
        loadChildren:() => import('./modules/admin.routes').then(admin => admin.adminRoutes)
      },
      {
        path:'client',
        loadChildren:() => import('./modules/client.routes').then(client => client.clientRoutes)
      }
    ]
  },

];
