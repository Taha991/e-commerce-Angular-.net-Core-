import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';


@NgModule({
  declarations: [NavBarComponent, TestErrorComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    RouterModule
  ],
  exports:[NavBarComponent]
})
export class CoreModule { }
