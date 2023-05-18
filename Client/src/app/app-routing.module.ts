import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';


const routes: Routes = [
  {path:'' , component:HomeComponent , data:{breadcrumb:'Home'}},
  {path:'test-error' , component:TestErrorComponent},
  {path:'server-error' , component:ServerErrorComponent},
  {path:'not-found'  , component:NotFoundComponent},
  {path:'shop' , loadChildren:()=>import('./shop/shop.module').then(m=>m.ShopModule)},
  // adding lazy loading
  {path:'basket' , loadChildren:()=>import('./basket/basket.module').then(m=>m.BasketModule)},

  {path:'**' , redirectTo:'' , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
