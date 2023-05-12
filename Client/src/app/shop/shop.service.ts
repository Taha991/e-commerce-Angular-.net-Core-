import { HttpClient, HttpParams } from '@angular/common/http';
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
  getProducts (brandId?:number , typeId?:number , sort?:string)
  {
    let params = new HttpParams();
    if(brandId) params = params.append("brandId" , brandId);
    if(typeId) params = params.append("typeId" , typeId);
    if(sort) params = params.append("sort" , sort);
    return this.http.get<Pagination<Product[]>>(this.baseUrl+'product' ,{params:params});
  }

  getBrands()
  {
    return this.http.get<Brand[]>(this.baseUrl+'product/brands');
  }

  getTypes()
  {
    return this.http.get<Type[]>(this.baseUrl+'product/types');

  }


}
