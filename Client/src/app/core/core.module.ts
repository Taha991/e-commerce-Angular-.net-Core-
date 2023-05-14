import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    RouterModule
  ],
  exports:[NavBarComponent]
})
export class CoreModule { }
