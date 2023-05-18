import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
 baseUrl ="https://localhost:7275/api/";
 private basketSource = new BehaviorSubject<Basket|null>(null);

 basketSource$= this.basketSource.asObservable();


 private basketTotalSource= new BehaviorSubject<BasketTotals|null>(null);
 
 basketTotalSource$= this.basketTotalSource.asObservable();

  constructor(private http:HttpClient) { }

  getBasket(id:string)
  {
    return this.http.get<Basket>(this.baseUrl+'basket?id='+id).subscribe({
      next:basket =>{
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  setBasket(basket:Basket)
  {
    return this.http.post<Basket>(this.baseUrl+'basket',basket).subscribe({
      next:basket=>{
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  getCurrentBasketValue()
  {
    return this.basketSource.value;

  }

  addItemToBasket(item:Product, quantity=1)
  {
    const itemToAdd = this.mapProductItemToBasketItem(item);
    const basket= this.getCurrentBasketValue() ??  this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items ,itemToAdd,quantity);
    this.setBasket(basket);
  }
  addOrUpdateItem(items:BasketItem[], itemToAdd:BasketItem ,quantity:number):BasketItem[] {
    const item = items.find(x=> x.id === itemToAdd.id);
    if(item)item.quantity+=quantity;
    else{
      itemToAdd.quantity=quantity;
      items.push(itemToAdd);
    }
    return items;

  }
  createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem("basket_Id" , basket.id)
    return basket;
  }
  // mapping the items
  private mapProductItemToBasketItem(item: Product) {
   return {
    id:item.id,
    productName: item.name,
    price : item.price,
    quantity:0,
    pictureUrl: item.pictureUrl,
    brand : item.productBrand,
    type : item.productType
   }
  }

  private calculateTotals()
  {
    const basket = this.getCurrentBasketValue();
    if(!basket) return;

    const shipping=0;
    const subtotal= basket.items.reduce((a,b) => (b.price *b.quantity) +a ,0)
    const total= subtotal+shipping;
    this.basketTotalSource.next({shipping, total, subtotal});
  }


}
