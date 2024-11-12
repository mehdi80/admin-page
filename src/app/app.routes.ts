import { Routes } from '@angular/router';
import {AdminComponent} from "./components/admin/admin.component";
import {ShellComponent} from "./shell/shell.component";

export const routes: Routes = [
  {
    path:'',
    component:ShellComponent ,
    children:[

    ]},
];
