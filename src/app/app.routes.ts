import { Routes } from '@angular/router';
import {AdminComponent} from "./components/admin/admin.component";
import {ShellComponent} from "./shell/shell.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {authGuard} from "./guards/auth.guard";
import {UserDetailComponent} from "./components/user-detail/user-detail.component";

export const routes: Routes = [
  {
    path:'',
    component:ShellComponent ,
    children:[
      {path:'login' ,component:LoginComponent},
      {path:'register' ,component:RegisterComponent},
      {path:'user-list' ,component:UserListComponent ,canActivate:[authGuard]},
      {path:'user-list/:id' ,component:UserDetailComponent ,canActivate:[authGuard]},
    ]},

];
