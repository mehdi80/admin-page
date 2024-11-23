import {Routes} from "@angular/router";
import {BasketComponent} from "../client/components/basket/basket.component";

export const clientRoutes:Routes = [
  {
    path: '',
    loadComponent:() => import('../client/client.component').then(clientCom => clientCom.ClientComponent),
    children:[
      {
        path:'products',
        loadComponent:() => import('../client/components/product/product.component').then(product=>product.ProductComponent),
      },
      {
        path:'products/:id',
        loadComponent:()=> import('../client/components/product-detail/product-detail.component').then(detailCopo=>detailCopo.ProductDetailComponent),
      },
      {path:"basket",
      loadComponent:()=> import('../client/components/basket/basket.component').then(basket=>basket.BasketComponent)
      }
    ]
  },

]
