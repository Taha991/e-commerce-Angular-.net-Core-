import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/paging';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brands';
import { Type } from '../shared/models/types';
import { ShopParams } from '../shared/models/shopparams';

@Injectable({
  providedIn: 'root'
})


export class ShopService {


  constructor(private http:HttpClient) { }
  baseUrl = "https://localhost:7275/api/";
  getProducts (shopParams:ShopParams)
  {
    let params = new HttpParams();
    if(shopParams.brandId>0) params = params.append("brandId" , shopParams.brandId);
    if(shopParams.typeId) params = params.append("typeId" , shopParams.typeId);
     params = params.append("sort" , shopParams.sort);
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
