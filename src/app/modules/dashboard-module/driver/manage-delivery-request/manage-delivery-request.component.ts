import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from 'src/app/services/driver-services/master.service';
import { Profile } from 'src/app/shared/models/Profile';
import { Restuarant } from 'src/app/shared/models/Restuarant';

@Component({
  selector: 'app-manage-delivery-request',
  templateUrl: './manage-delivery-request.component.html',
  styleUrls: ['./manage-delivery-request.component.css']
})
export class ManageDeliveryRequestComponent implements OnInit {

  restuarantDetails = new Restuarant();
  profileDetails = new Profile();
  deliveryStatus!: boolean;
  orderId!: string
  path = location.pathname;

  constructor(private activatedRoute: ActivatedRoute, private driverService: MasterService, private notify: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.orderId = data['id']
    })

    this.getDeliveryRequestDetails();
  }

  onClickUpdateDeliveryStatus(deliveryStatus: string) {
    this.driverService.updateDeliveryStatusByOrderId(this.orderId,deliveryStatus).subscribe((data) => {
      this.notify.success("Delivery Status is Setting Successfully.");
    },(err) => {
      this.notify.error("There is an Error Occur " + err)
    })
  }

  getDeliveryRequestDetails() {
    this.driverService.getDeliveryRequestDetailsByOrderId(this.orderId).subscribe((data) => {
      data.forEach((el) => {
        let TYPED_ARRAY = new Uint8Array(el.imageFile.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, '');
        el.imageFile = STRING_CHAR
        
        let TYPED_ARRAY_PROFILE_IMAGE = new Uint8Array(el.profileImage.data);
        const STRING_CHAR_PROFILE_IMAGE = TYPED_ARRAY_PROFILE_IMAGE.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, '');

        el.profileImage = STRING_CHAR_PROFILE_IMAGE
        
        this.restuarantDetails.featuredImage = el.imageFile
        this.restuarantDetails.restuarantName = el.restuarantName
        this.restuarantDetails.location = el.location
        this.restuarantDetails.lanLine = el.landMobile

        this.profileDetails.fullName = el.fullName
        this.profileDetails.profileImage = el.profileImage
        this.profileDetails.location = el.cutomerLocation
        this.profileDetails.mobileNumber = el.mobileNumber
      })
    })
  }

}
