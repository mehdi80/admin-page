import {Routes} from "@angular/router";

export const authRoutes:Routes = [
  {path:'',
  loadComponent:()=> import('../shared/components/auth/auth.component').then(auth=>auth.AuthComponent),
    children:[
      {
        path:'login',
        loadComponent:()=> import('../shared/components/login/login.component').then(login=>login.LoginComponent)
      },
      {
        path:'register',
        loadComponent:() =>import('../shared/components/register/register.component').then(register=>register.RegisterComponent)
      },
      {
        path:'client-login',
        loadComponent:()=>import('../shared/components/client-login/client-login.component').then(clientLogin=>clientLogin.ClientLoginComponent)
      },
      {
        path:'client-register',
        loadComponent:()=>import('../shared/components/client-register/client-register.component').then(clientRegister=>clientRegister.ClientRegisterComponent)
      }
    ]
  },

]
