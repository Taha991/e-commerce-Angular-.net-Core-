import { Component , OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/product';
import { Brand } from 'src/app/shared/models/brands';
import { Type } from 'src/app/shared/models/types';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})


export class ShopComponent implements OnInit {

  products:Product[]=[];
  brands:Brand[]=[];
  types:Type[]=[];
  brandIdSelected =0;
  typeIdSelected =0;
  sortSelected="name";
  sortOptions=[
    {name:'Alphabetical' ,value:'name'},
    {name:'price : low to high' ,value:'priceAsc'},
    {name:'price : High to low' , value:'priceDesc'}
  ]
  constructor(private shopService:ShopService) {
  }

  ngOnInit(): void {

    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts()
  {
    this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected , this.sortSelected).subscribe({
      next:response =>  this.products = response.data,
      error: error => console.log(error)

     })
  }

  getBrands()
  {
    this.shopService.getBrands().subscribe({
      next:response =>  this.brands = [{id:0 , name:'All'} , ...response],
      error: error => console.log(error)

     })
  }
  getTypes()
  {
    this.shopService.getTypes().subscribe({
      next:response =>  this.types = [{id:0 , name:'All'} , ...response],
      error: error => console.log(error)

     })

  }

  onBrandSelected(brandId:number)
  {
    this.brandIdSelected =brandId;
    this.getProducts();
  }

  onTypeSelected(typeId:number)
  {
    this.typeIdSelected=typeId;
    this.getProducts();
  }

  onSortSelected(event:any)
  {
    this.sortSelected = event.target.value;
    this.getProducts();
  }
}
