import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from 'src/app/services/driver-services/master.service';
import { OrderRequestsService } from 'src/app/services/seller-services/order-requests.service';
import { Profile } from 'src/app/shared/models/Profile';
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
  isDriverAssigned: boolean = false;
  driverDetails = new Profile();
  userId!: string;
  deliveryStatus!: string;

  constructor(private restuarantService: RestuarantServiceService, private route: ActivatedRoute,
    private orderRequestService: OrderRequestsService, private notify: ToastrService,
    private driverServiceMaster: MasterService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.queryParamOrderId = params['orderId'],
        this.restuarantId = params['restuarantId']
    })

    this.getSelectedRestuarantDetails();
    this.getEatablesByRestuarantAndOrder();
    this.driverServiceMaster.getAssignedDriverDetails(this.queryParamOrderId).subscribe((data: any) => {
      if (data != null) {
        this.isDriverAssigned = true;
        let TYPED_ARRAY = new Uint8Array(data.profileImage.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, '');

        this.driverDetails.profileImage = STRING_CHAR
        this.driverDetails.fullName = data.fullName
        this.driverDetails.emailAddress = data.emailAddress
        this.driverDetails.location = data.location
        this.driverDetails.mobileNumber = data.mobileNumber

        this.driverServiceMaster.getDeliveryRequestStatusByOrderId(this.queryParamOrderId).subscribe((data) => {
          console.log(data.orderDeliveryStatus);
          this.deliveryStatus = data.orderDeliveryStatus;
        })
      }
    })
  }

  onClickOpenToDeliver() {
    this.driverServiceMaster.assignDriverToOrder(this.restuarantDetails.lat, this.restuarantDetails.long, this.queryParamOrderId).subscribe((data) => {
      this.notify.success("Driver Assign Successfullt.")
    })
  }

  onUpdateOrderStatus(orderStatus: string) {
    if (orderStatus === "1") {
      this.newOrderStatus = "PRE"
    } else if (orderStatus === "2") {
      this.newOrderStatus = "PACK"
    } else if (orderStatus === "3") {
      this.newOrderStatus = "FD"
    } else if (orderStatus === "4") {
      this.newOrderStatus = "D"
    } else if (orderStatus === "5") {
      this.newOrderStatus = "COM"
    }

    this.orderRequestService.manageOrderStatusByOrderId(this.orderId, this.newOrderStatus).subscribe((resp) => {
      this.notify.success("Order Status Updated.");
    }, (err) => {
      this.notify.error("There is An Error Occur " + err);
    });
  }

  getEatablesByRestuarantAndOrder() {
    this.sellerId = sessionStorage.getItem("userId");

    this.orderRequestService.getAlleatablesByEachRestuarantByEachOrder(this.queryParamOrderId).subscribe((resp) => {
      resp.forEach((el) => {
        this.allEatablesByOrder.push(el);
      })

      this.allEatablesByOrder.forEach((el) => {
        this.totalAmount = el.subTotal
        this.currentOrderStatus = el.orderStatus == "PEN" ? "Pending" : el.orderStatus == "PRE" ? "Preparering" : el.orderStatus == "PACK" ? "Packaging" : el.orderStatus == "FD" ? "Finding Driver" : el.orderStatus == "D" ? "Delivering" : el.orderStatus == "COM" ? "Complete" : "";
        this.orderId = el.orderId
        this.userId = el.userId;
      })
    })
  }

  getSelectedRestuarantDetails() {
    this.restuarantService.getRestuarantByRestuarantId(this.restuarantId).subscribe((resp) => {
      resp.forEach((el) => {
        let TYPED_ARRAY = new Uint8Array(el.imageFile.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, '');

        el.imageFile = STRING_CHAR

        this.selectedrestuarantDetails.push(el);
      })

      this.selectedrestuarantDetails.forEach((el) => {
        this.restuarantDetails.restuarantName = el.restuarantName;
        this.restuarantDetails.lat = el.lat;
        this.restuarantDetails.long = el.long;
      });
    })
  }

}
