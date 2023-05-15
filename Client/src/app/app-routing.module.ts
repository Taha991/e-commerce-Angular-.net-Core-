import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';


const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'test-error' , component:TestErrorComponent},
  {path:'shop' , loadChildren:()=>import('./shop/shop.module').then(m=>m.ShopModule)},
  {path:'**' , redirectTo:'' , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
