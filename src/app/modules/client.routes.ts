import {Routes} from "@angular/router";

export const clientRoutes:Routes = [
  {
    path: "",
    loadComponent:() => import('../components/client/client.component').then(clientCom => clientCom.ClientComponent)
  }
]
