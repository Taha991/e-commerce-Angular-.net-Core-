import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/paging';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brands';
import { Type } from '../shared/models/types';
import { ShopParams } from '../shared/models/shopParams';

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
     params= params.append("pageIndex" , shopParams.pageNumber);
     params = params.append("pageSize" , shopParams.pageSize);
     if(shopParams.search) params = params.append('search' , shopParams.search);
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

  getProduct(id:number)
  {
    return this.http.get<Product>(this.baseUrl+'product/'+id);
  }


}
