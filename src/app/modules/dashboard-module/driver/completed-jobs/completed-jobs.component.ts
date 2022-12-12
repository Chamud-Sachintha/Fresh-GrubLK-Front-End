import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/driver-services/master.service';
import { DeliveryRequest } from 'src/app/shared/models/DeliveryRequest';

@Component({
  selector: 'app-completed-jobs',
  templateUrl: './completed-jobs.component.html',
  styleUrls: ['./completed-jobs.component.css']
})
export class CompletedJobsComponent implements OnInit {

  driverId: any;
  completedDeliveryRequestsList: any[] = []

  constructor(private driverService: MasterService) { }

  ngOnInit(): void {
    this.driverId = sessionStorage.getItem("userId");
    this.driverService.getCompletedDeliveryRequestsByDriverId(this.driverId).subscribe((data) => {
      data.forEach((el) => {
        let TYPED_ARRAY = new Uint8Array(el.imageFile.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');

        el.imageFile = STRING_CHAR

        this.completedDeliveryRequestsList.push(el)
      })
    })
  }

}
