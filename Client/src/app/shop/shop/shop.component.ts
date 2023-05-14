import { Component , ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/product';
import { Brand } from 'src/app/shared/models/brands';
import { Type } from 'src/app/shared/models/types';
import { ShopParams } from 'src/app/shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})


export class ShopComponent implements OnInit {
  @ViewChild('search')searchTerms ?:ElementRef;
  products:Product[]=[];
  brands:Brand[]=[];
  types:Type[]=[];

  shopParams = new ShopParams();

  totalCount = 0;

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
    this.shopService.getProducts(this.shopParams).subscribe({
      next:response =>  {
        this.products = response.data;
        this.shopParams.pageNumber= response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
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
    this.shopParams.brandId =brandId;
    this.shopParams.pageNumber =1;

    this.getProducts();
  }

  onTypeSelected(typeId:number)
  {
    this.shopParams.typeId=typeId;
    this.shopParams.pageNumber =1;

    this.getProducts();
  }

  onSortSelected(event:any)
  {
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event:any)
  {
    if(this.shopParams.pageNumber!== event.page)
    {
      this.shopParams.pageNumber = event.page;
      this.getProducts();
    }
  }

  onSearch()
  {
    this.shopParams.search= this.searchTerms?.nativeElement.value;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }

  onReset()
  {
    if(this.searchTerms) this.searchTerms.nativeElement.value="";
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
