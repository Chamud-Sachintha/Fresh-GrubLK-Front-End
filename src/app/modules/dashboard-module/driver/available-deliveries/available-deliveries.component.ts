import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/services/driver-services/master.service';
import { DeliveryRequest } from 'src/app/shared/models/DeliveryRequest';

@Component({
  selector: 'app-available-deliveries',
  templateUrl: './available-deliveries.component.html',
  styleUrls: ['./available-deliveries.component.css']
})
export class AvailableDeliveriesComponent implements OnInit {

  allAvailableDeliveryRequetsList: DeliveryRequest[] = [];
  subTotal!: number;
  orderStatus!: string;
  driverId: any;

  constructor(private driverService: MasterService, private router: Router) { }

  ngOnInit(): void {
    this.driverId = sessionStorage.getItem("userId");
    this.getAvailableDeliveryRequestsByDriverId();
    console.log(this.allAvailableDeliveryRequetsList);
  }

  onClickManageDeliveryRequest(orderId: string) {
    this.router.navigate(['/app/driver/manage-delivery-request', orderId])
  }

  getAvailableDeliveryRequestsByDriverId() {
    this.driverService.getAlldeliveryRequetsByDriverId(this.driverId).subscribe((data) => {
      data.forEach((el) => {
        this.allAvailableDeliveryRequetsList.push(el);
        this.subTotal = el.subTotal
        this.orderStatus = el.orderStatus
      })
    })
  }

}
