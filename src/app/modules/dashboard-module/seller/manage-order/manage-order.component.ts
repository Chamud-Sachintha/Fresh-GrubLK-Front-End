import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selectedrestuarantDetails: any[] = [];

  constructor(private restuarantService: RestuarantServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.restuarantId = params['id']; // (+) converts string 'id' to a number
    });

    this.getSelectedRestuarantDetails();
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
