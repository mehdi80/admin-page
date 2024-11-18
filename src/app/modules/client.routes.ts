import {Routes} from "@angular/router";

export const clientRoutes:Routes = [
  {
    path: '',
    loadComponent:() => import('../client/client.component').then(clientCom => clientCom.ClientComponent)
  },
  {
    path:'products',
    loadComponent:() => import('../client/components/product/product.component').then(product=>product.ProductComponent)
  }
]
