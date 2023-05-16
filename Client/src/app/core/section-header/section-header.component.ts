import { Component  , OnInit} from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {


  constructor(public bcService:BreadcrumbService) {


  }
  ngOnInit(): void {
  }

}
