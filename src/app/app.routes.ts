import {Routes} from '@angular/router';

import {authGuard} from "./guards/auth.guard";


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shell/shell.component').then(sell => sell.ShellComponent),
    children: [
      {
        path:'client',
        loadChildren:() => import('./modules/client.routes').then(client => client.clientRoutes)
      },
      {
        path: 'auth',
        loadChildren:() => import('./modules/auth.route').then(auth => auth.authRoutes),
        },
      {
        path: 'admin',
       // canActivate:[authGuard],
        loadChildren:() => import('./modules/admin.routes').then(admin => admin.adminRoutes)
      },
    ]
  },
];
