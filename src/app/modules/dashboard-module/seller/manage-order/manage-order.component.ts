import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderRequestsService } from 'src/app/services/seller-services/order-requests.service';
import { Restuarant } from 'src/app/shared/models/Restuarant';
import { RestuarantServiceService } from '../../../../services/seller-services/restuarant-service.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {

  restuarantDetails = new Restuarant();
  restuarantId!: any;
  sellerId!: any;
  selectedrestuarantDetails: any[] = [];
  allEatablesByOrder: any[] = []
  totalAmount!: number;
  currentOrderStatus!: string;
  orderId!: string;
  newOrderStatus!: string;
  orderStatus!: string;
  queryParamOrderId!: string;

  constructor(private restuarantService: RestuarantServiceService, private route: ActivatedRoute ,
              private orderRequestService: OrderRequestsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.queryParamOrderId = params['orderId'],
      this.restuarantId = params['restuarantId']
    })

    this.getSelectedRestuarantDetails();
    this.getEatablesByRestuarantAndOrder();
    console.log(this.allEatablesByOrder);
  }

  onUpdateOrderStatus(orderStatus: string) {
    this.newOrderStatus = orderStatus == "1" ? "PRE" : "";
    this.orderRequestService.manageOrderStatusByOrderId(this.orderId, this.newOrderStatus).subscribe((resp) => {
      console.log(resp);
    })
  }

  getEatablesByRestuarantAndOrder() {
    this.sellerId = sessionStorage.getItem("userId");
    
    this.orderRequestService.getAlleatablesByEachRestuarantByEachOrder(this.queryParamOrderId).subscribe((resp) => {
      resp.forEach((el) => {
        this.allEatablesByOrder.push(el);
      })

      this.allEatablesByOrder.forEach((el) => {
        this.totalAmount = el.subTotal
        this.currentOrderStatus = el.orderStatus == "PEN" ? "Pending" : el.orderStatus == "PRE" ? "Preparering" : "";
        this.orderId = el.orderId
      })
    })
  }

  getSelectedRestuarantDetails() {
    this.restuarantService.getRestuarantByRestuarantId(this.restuarantId).subscribe((resp) => {
      resp.forEach((el) => {
        let TYPED_ARRAY = new Uint8Array(el.imageFile.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');

        el.imageFile = STRING_CHAR

        this.selectedrestuarantDetails.push(el);
      })

      this.selectedrestuarantDetails.forEach((el) => {
        this.restuarantDetails.restuarantName = el.restuarantName;
      });
    })
  } 

}
