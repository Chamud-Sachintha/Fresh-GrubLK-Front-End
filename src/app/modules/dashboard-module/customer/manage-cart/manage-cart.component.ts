import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderServiceService } from 'src/app/services/customer-services/order-service.service';
import { OrderStatus } from 'src/app/shared/config/orderStatus';
import { Cart } from 'src/app/shared/models/Cart';
import { OrderDetails } from 'src/app/shared/models/OrderDetails';

@Component({
  selector: 'app-manage-cart',
  templateUrl: './manage-cart.component.html',
  styleUrls: ['./manage-cart.component.css']
})
export class ManageCartComponent implements OnInit {

  orderStatus = new OrderStatus();
  orderDetails = new OrderDetails();
  selectedCartItems: any[] = [];
  orderItemsList: Cart[] = [];
  userId!: any;
  total!: number;
  tmpQuantity!: number;
  tmpUnitPrice!: number;
  change!: string;
  restuarantId!: string;
  subTotal: number = 0;

  constructor(private orderingService: OrderServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.restuarantId = params['id']; // (+) converts string 'id' to a number
    });

    this.getCartItemsByCustomerId();

    console.log(this.selectedCartItems);
  }

  onSubmitCheckout() {
    this.orderDetails.userId = sessionStorage.getItem("userId");
    this.orderDetails.subTotal = this.subTotal;
    this.orderDetails.orderStatus = this.orderStatus.PENDING_STATUS;
    this.orderDetails.restuarantId = this.restuarantId;

    this.selectedCartItems.forEach((el) => {
      let cartItemsDetails = <Cart>{};
      cartItemsDetails.eatableId = el.eatableId
      cartItemsDetails.eatableQuantity = el.quantity
      cartItemsDetails.total = el.total

      this.orderItemsList.push(cartItemsDetails);
    });

    this.orderDetails.cartItemsList = this.orderItemsList;

    this.orderingService.placeNewOrderDetailsByCustomer(this.orderDetails).subscribe((resp) => {
      console.log(resp);
    });

    this.orderItemsList = []
    this.orderDetails.cartItemsList = []
  }

  getCartItemsByCustomerId() {
    this.userId = sessionStorage.getItem("userId");
    
    this.orderingService.getAllCartItemsByCustomer(this.userId, this.restuarantId).subscribe((resp) => {
      resp.forEach((el) => {
        let TYPED_ARRAY = new Uint8Array(el.eatableFeaturedImage.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');

        el.eatableFeaturedImage = STRING_CHAR
        this.total = el.eatablePrice * el.quantity
        this.tmpQuantity = el.quantity;
        this.tmpUnitPrice = el.eatablePrice;
        this.subTotal += this.total;
        Object.assign(el, {total: this.total});

        this.selectedCartItems.push(el);
      })
    })
  }

  onChangeQantity(eatableId: string, quantity: string, price: string) {
    this.subTotal = 0;
    this.selectedCartItems.forEach((el) => {
      if (el.eatableId === eatableId) {
        el.total = parseInt(quantity) * parseInt(price)
      }

      this.subTotal += parseInt(el.total)
    })
  }

}
