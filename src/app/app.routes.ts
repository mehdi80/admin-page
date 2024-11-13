import { Routes } from '@angular/router';
import {AdminComponent} from "./components/admin/admin.component";
import {ShellComponent} from "./shell/shell.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

export const routes: Routes = [
  {
    path:'',
    component:ShellComponent ,
    children:[
      {path:'login' ,component:LoginComponent},
      {path:'register' ,component:RegisterComponent},
    ]},

];
