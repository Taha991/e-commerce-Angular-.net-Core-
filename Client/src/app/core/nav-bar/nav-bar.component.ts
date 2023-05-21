import { Component  , OnInit} from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {


  constructor(public basketService:BasketService , public accountService: AccountService){}


  ngOnInit(): void {
  }

  getCount(items:BasketItem[])
  {
    return items.reduce((sum, items)=> sum+items.quantity,0)
  }
}
