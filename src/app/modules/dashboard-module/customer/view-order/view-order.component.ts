import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { OrderServiceService } from 'src/app/services/customer-services/order-service.service';
import { EatableServiceService } from 'src/app/services/seller-services/eatable-service.service';
import { RestuarantServiceService } from 'src/app/services/seller-services/restuarant-service.service';
import { CommonDetails } from 'src/app/shared/models/CommonDetails';
import { Profile } from 'src/app/shared/models/Profile';
import { Restuarant } from 'src/app/shared/models/Restuarant';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  selectedEatableDetails: any[] = [];
  restuarantDetails = new Restuarant();
  orderId!: any;
  orderSubTotal!: number;
  orderStatus!: any;
  driverDetails = new Profile();
  isRestuarantDetailsHave: boolean = true;
  commonDetails = new CommonDetails();
  isDriverAssigned: boolean = false;

  constructor(private route: ActivatedRoute, private eatableService: EatableServiceService, private restuarantService: RestuarantServiceService
    , private commonService: CommonService, private orderService: OrderServiceService) { }

  ngOnInit(): void {
    this.orderStatus = sessionStorage.getItem("orderStatus");
    this.route.params.subscribe((params) => {
      this.orderId = params['id'];
    });

    this.getSelectedEatableDetailsByOrderId();
    this.getAssignedDriverForDeliver();
    this.commonService.getDeliveryFeeFromCommonPrices("DF").subscribe((data) => {
      this.commonDetails = data;
    })
  }

  getAssignedDriverForDeliver() {
    if (sessionStorage.getItem("orderStatus") === "D" || sessionStorage.getItem("orderStatus") === "COM") {
      this.orderService.getAssignedDriverForDeliverByOrderIdAndOrderStatus(this.orderId).subscribe((resp: any[]) => {
        resp.forEach((el) => {
          let TYPED_ARRAY = new Uint8Array(el.profileImage.data);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');

          this.isDriverAssigned = true;
          this.driverDetails.profileImage = STRING_CHAR;
          this.driverDetails.fullName = el.fullName;
          this.driverDetails.emailAddress = el.emailAddress;
          this.driverDetails.mobileNumber = el.mobileNumber;
          this.driverDetails.location = el.location
        })
      })
    }
  }

  getSelectedEatableDetailsByOrderId() {
    this.eatableService.getEatablesByOrderId(this.orderId).subscribe((resp) => {
      resp.forEach((el) => {
        let TYPED_ARRAY = new Uint8Array(el.eatableFeaturedImage.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, '');

        el.imageFile = STRING_CHAR
        this.selectedEatableDetails.push({ ...el });
      })

      for (let i = 0; i < this.selectedEatableDetails.length; i++) {
        this.orderSubTotal = parseFloat(this.selectedEatableDetails[i].subTotal);
        this.getSelectedRestuarantDetailsById(this.selectedEatableDetails[i].restuarantId);
        this.orderStatus = (this.selectedEatableDetails[i].orderStatus === "PEN" ? "Pending" : this.selectedEatableDetails[i].orderStatus === "PRE" ? "Preparing" : this.selectedEatableDetails[i].orderStatus === "PACK" ? "Packing" : this.selectedEatableDetails[i].orderStatus === "FD" ? "Finding Driver" : this.selectedEatableDetails[i].orderStatus === "D" ? "Delivering" : this.selectedEatableDetails[i].orderStatus === "COM" ? "Complete" : "");
        sessionStorage.setItem("orderStatus", this.selectedEatableDetails[i].orderStatus);
        break;
      }
    })
  }

  getSelectedRestuarantDetailsById(restruarantId: string) {
    this.restuarantService.getRestuarantByRestuarantId(restruarantId).subscribe((resp) => {
      if (resp.length != 0) {
        resp.forEach((el) => {
          let TYPED_ARRAY = new Uint8Array(el.imageFile.data);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');

          el.imageFile = STRING_CHAR
          this.restuarantDetails.restuarantName = el.restuarantName;
          this.restuarantDetails.location = el.location;
          this.restuarantDetails.lanLine = el.landMobile;
          this.restuarantDetails.featuredImage = el.imageFile;
        })
      } else {
        console.log(resp.length);
        this.isRestuarantDetailsHave = false;
      }
    })
  }

}
