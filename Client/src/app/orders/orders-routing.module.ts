import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';

const routes: Routes = [
  {path: '' , component:OrdersComponent},
  {path:'id' , component:OrderDetailedComponent, data:{breadcrumb:{alias:'OrderDetailed'}}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
