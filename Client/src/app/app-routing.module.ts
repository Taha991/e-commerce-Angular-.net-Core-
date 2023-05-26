import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { AuthGuard } from './core/guards/auth.guard.spec';


const routes: Routes = [
  {path:'' , component:HomeComponent , data:{breadcrumb:'Home'}},
  {path:'test-error' , component:TestErrorComponent},
  {path:'server-error' , component:ServerErrorComponent},
  {path:'not-found'  , component:NotFoundComponent},
  // adding lazy loading
  {path:'shop' , loadChildren:()=>import('./shop/shop.module').then(m=>m.ShopModule)},
  // adding lazy loading
  {path:'basket' , loadChildren:()=>import('./basket/basket.module').then(m=>m.BasketModule)},
   // adding lazy loading
   {
    path:'checkout' ,
    canActivate:[AuthGuard],
    loadChildren:()=>import('./checkout/checkout.module').then(m=>m.CheckoutModule)
  },
   // adding lazy loading
   {path:'account' , loadChildren:()=>import('./account/account.module').then(m=>m.AccountModule)},

   {
    path:'orders',
    canActivate:[AuthGuard],
    loadChildren:()=>import('./orders/orders.module').then(m=>m.OrdersModule),
    data:{breadcrumb:'Orders'}
   },

  {path:'**' , redirectTo:'' , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
