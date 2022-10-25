import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from 'src/app/services/customer-services/order-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  listOfOrders: any[] = []
  userId: any;
  usermail!: any;
  constructor(private orderingService: OrderServiceService) { }

  ngOnInit(): void {
    // this.usermail = 
    this.getAllOrdersByCustomerId()
    console.log(this.listOfOrders);
  }

  getAllOrdersByCustomerId() {
    this.userId = sessionStorage.getItem("userId");

    this.orderingService.getAllOrdersByCustomerId(this.userId).subscribe((resp) => {
      resp.forEach((el) => {
        this.listOfOrders.push(el);
      })
    })
  }

}
