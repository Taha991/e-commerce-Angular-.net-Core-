import { Component  , OnInit} from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent  implements OnInit{

  product?:Product;
   constructor( private shopServices:ShopService , private activatedRoute: ActivatedRoute) {


   }
  ngOnInit(): void {

    this.loadProduct();

  }

  loadProduct()
  {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) this.shopServices.getProduct(+id).subscribe({
      next:product => this.product =product,
      error: error => console.log(error)

    });
  }

}
