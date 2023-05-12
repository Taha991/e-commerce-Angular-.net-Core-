import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/paging';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brands';
import { Type } from '../shared/models/types';

@Injectable({
  providedIn: 'root'
})


export class ShopService {


  constructor(private http:HttpClient) { }
  baseUrl = "https://localhost:7275/api/"
  getProducts ()
  {
    return this.http.get<Pagination<Product[]>>(this.baseUrl+'product?pageSize=1')
  }

  getBrands()
  {
    return this.http.get<Brand[]>(this.baseUrl+'product/brands')
  }

  getTypes()
  {
    return this.http.get<Type[]>(this.baseUrl+'product/types')

  }


}
