import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/shared/models/basket';
import { OrderToCreate } from 'src/app/shared/models/order';
import { Address } from 'src/app/shared/models/user';


@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})

export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;



  constructor(private toastr: ToastrService ,  private checkoutService: CheckoutService ,

  private basketService: BasketService ) {





  }

  ngOnInit(): void {

  }

  submitOrder()
  {
    const basket = this.basketService.getCurrentBasketValue();
    if(!basket) return;
    const orderToCreate = this.getOrderToCreate(basket);

    if(!orderToCreate) return;

    this.checkoutService.createOrder(orderToCreate).subscribe({
      next:order =>{
        this.toastr.success('order created succefuly');
      }
    })
  }

  private getOrderToCreate(basket: Basket) {
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value as Address;
    if (!deliveryMethodId || !shipToAddress) throw new Error('Problem with basket');
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    }

}
}
