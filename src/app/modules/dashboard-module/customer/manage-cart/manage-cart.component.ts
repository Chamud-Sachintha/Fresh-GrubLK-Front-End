import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from 'src/app/services/customer-services/order-service.service';

@Component({
  selector: 'app-manage-cart',
  templateUrl: './manage-cart.component.html',
  styleUrls: ['./manage-cart.component.css']
})
export class ManageCartComponent implements OnInit {

  selectedCartItems: any[] = [];
  userId!: any;
  total!: number;
  tmpQuantity!: number;
  tmpUnitPrice!: number;
  change!: string;

  constructor(private orderingService: OrderServiceService) { }

  ngOnInit(): void {
    this.getCartItemsByCustomerId();
    console.log(this.selectedCartItems);
  }

  getCartItemsByCustomerId() {
    this.userId = sessionStorage.getItem("userId");
    
    this.orderingService.getAllCartItemsByCustomer(this.userId).subscribe((resp) => {
      resp.forEach((el) => {
        let TYPED_ARRAY = new Uint8Array(el.eatableFeaturedImage.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');

        el.eatableFeaturedImage = STRING_CHAR
        this.total = el.eatablePrice * el.quantity
        this.tmpQuantity = el.quantity;
        this.tmpUnitPrice = el.eatablePrice;
        Object.assign(el, {total: this.total});

        this.selectedCartItems.push(el);
      })
    })
  }

  onChangeQantity(eatableId: string, quantity: string, price: string) {
    this.selectedCartItems.forEach((el) => {
      if (el.eatableId === eatableId) {
        el.total = parseInt(quantity) * parseInt(price)
      }
    })
  }

}
