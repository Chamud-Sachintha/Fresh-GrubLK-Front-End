import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderRequestsService } from 'src/app/services/seller-services/order-requests.service';

@Component({
  selector: 'app-order-requests',
  templateUrl: './order-requests.component.html',
  styleUrls: ['./order-requests.component.css']
})
export class OrderRequestsComponent implements OnInit {

  orderRequestsList: any[] = [];
  ongoingOrdersList: any[] = [];
  sellerId!: any;
  constructor(private orderRequestService: OrderRequestsService, private router: Router) { }

  ngOnInit(): void {
    this.getAllOrderRequestsByEachSeller();
    this.getOngoingOrderRequestsBySeller();
    console.log(this.ongoingOrdersList);
  }

  getOngoingOrderRequestsBySeller() {
    this.sellerId = sessionStorage.getItem("userId");

    this.orderRequestService.getAllOngoingOrdersBySeller(this.sellerId).subscribe((resp) => {
      resp.forEach((el) => {
        let TYPED_ARRAY = new Uint8Array(el.imageFile.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');

        el.imageFile = STRING_CHAR

        this.ongoingOrdersList.push(el);
      })
    })
  }

  getAllOrderRequestsByEachSeller() {
    this.sellerId = sessionStorage.getItem("userId");

    this.orderRequestService.getAllOrderRequestsByEachSeller(this.sellerId).subscribe((resp) => {
      resp.forEach((el) => {
        let TYPED_ARRAY = new Uint8Array(el.imageFile.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');

        el.imageFile = STRING_CHAR
        this.orderRequestsList.push(el);
      })
    })
  }

}
