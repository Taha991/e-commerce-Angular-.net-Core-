import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pagination } from './shared/models/paging';
import { Product } from './shared/models/product';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http:HttpClient, private basketService:BasketService , private accountService:AccountService){}

  products:any[]=[];

  ngOnInit(): void {
      this.http.get<Pagination<Product[]>>("https://localhost:7275/api/product").subscribe({
        next :(response) => this.products = response.data,
        error:error => console.error(error),
        complete:() =>{
          console.log("Requset complet");
          console.log("Extra statment");
        }
      })

      const basketId= localStorage.getItem("basket_Id");
      if(basketId) this.basketService.getBasket(basketId);

  }

  title = 'Shopping';

  loadCurrentUser()
  {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe();
  }
}


