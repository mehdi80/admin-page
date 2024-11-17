import {Routes} from "@angular/router";
import {authGuard} from "../guards/auth.guard";

export const adminRoutes:Routes = [
  {
    path:'',
    canActivate:[authGuard],
    loadComponent:() =>import('../components/admin/admin.component').then(adminCom =>adminCom.AdminComponent),
  },
  {
    path:'user-list',
    canActivate:[authGuard],
    loadComponent:()=> import('../components/user-list/user-list.component').then(userList => userList.UserListComponent),
  },
  {
    path:'user-list/:id',
    canActivate:[authGuard],
    loadComponent:()=>import('../components/user-detail/user-detail.component').then(userDetail => userDetail.UserDetailComponent),
  },
  {
    path:'user-list/:id/edit-user',
    canActivate:[authGuard],
    loadComponent:()=>import('../components/edit-user/edit-user.component').then(edit =>edit.EditUserComponent),
  }
]
