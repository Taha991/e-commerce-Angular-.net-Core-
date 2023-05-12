import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';


@NgModule({
  declarations: [
    PagingHeaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    PaginationModule.forRoot()
  ],
  exports:[PaginationModule,
    PagingHeaderComponent
  ]
})
export class SharedModule { }
