import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    PaginationModule.forRoot()
  ],
  exports:[PaginationModule]
})
export class SharedModule { }
