import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RestuarantServiceService } from 'src/app/services/seller-services/restuarant-service.service';
import { Restuarant } from 'src/app/shared/models/Restuarant';

@Component({
  selector: 'app-food-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.css']
})
export class FoodOrderComponent implements OnInit {

  allRestuarants: any[] = [];

  constructor(private restuarantService: RestuarantServiceService, private domainSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getAllrestuarants();
  }

  getAllrestuarants() {
    this.restuarantService.getListOfrestuarants().subscribe((resp) => {
      resp.forEach((restuarant) => {
        let TYPED_ARRAY = new Uint8Array(restuarant.imageFile.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');

        restuarant.imageFile = STRING_CHAR
        this.allRestuarants.push(restuarant);

        console.log(this.allRestuarants);
      });
    });
  }

}
