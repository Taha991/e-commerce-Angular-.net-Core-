import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
 baseUrl= 'https://localhost:7275/api/';
  constructor(private http:HttpClient) { }


  getOrdersForUser()
  {
    return this.http.get<Order[]>(this.baseUrl+'orders');
  }
  getOrderDetails(id:number)
  {
    return this.http.get<Order>(this.baseUrl+'orders/'+id);
  }
}
