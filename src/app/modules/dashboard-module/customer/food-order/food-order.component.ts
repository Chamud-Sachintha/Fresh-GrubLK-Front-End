import { Component, OnInit } from '@angular/core';
import { RestuarantServiceService } from 'src/app/services/seller-services/restuarant-service.service';

@Component({
  selector: 'app-food-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.css']
})
export class FoodOrderComponent implements OnInit {

  allRestuarants: any[] = [];
  lat!: any;
  long!: any;
  setFilters: boolean = false;

  constructor(private restuarantService: RestuarantServiceService) { }

  ngOnInit(): void {
    this.getAllrestuarants();
  }

  onClickSearchType(searchType: string, searchValue: string) {
    this.allRestuarants = [];
    this.restuarantService.getResuarantsBySearchType(searchType, searchValue).subscribe((resp) => {
      resp.forEach((restuarant) => {
        let TYPED_ARRAY = new Uint8Array(restuarant.imageFile.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');

        restuarant.imageFile = STRING_CHAR
        this.allRestuarants.push(restuarant);

        this.setFilters = true;
      })
    });
  }

  clearFilters() {
    this.setFilters = false;
    this.getAllrestuarants();
  }

  getAllrestuarants() {
    this.allRestuarants = [];
    this.lat = sessionStorage.getItem("lat");
    this.long = sessionStorage.getItem("long");
    this.restuarantService.getListOfrestuarants(this.lat, this.long).subscribe((resp) => {
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
