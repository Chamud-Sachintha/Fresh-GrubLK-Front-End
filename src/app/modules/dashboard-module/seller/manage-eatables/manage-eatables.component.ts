import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/services/seller-services/category-service.service';
import { EatableServiceService } from 'src/app/services/seller-services/eatable-service.service';
import { RestuarantServiceService } from 'src/app/services/seller-services/restuarant-service.service';

@Component({
  selector: 'app-manage-eatables',
  templateUrl: './manage-eatables.component.html',
  styleUrls: ['./manage-eatables.component.css']
})
export class ManageEatablesComponent implements OnInit {

  sellerId: any;
  isRestuarant: boolean = false;
  isCategory: boolean = false;
  getListOfEatablesBySeller: any[] = [];
  getAllRestuarantsBySellerId: any[] = [];
  getAllCategoriesBySellerId: any[] = [];
  searchValue!: string;
  constructor(private eatableService: EatableServiceService, private router: Router, private restuarantService: RestuarantServiceService,
              private categoryService: CategoryServiceService) { }

  ngOnInit(): void {
    this.sellerId = sessionStorage.getItem("userId");
    this.getListOfEatablesBySellerId();
    console.log(this.getAllRestuarantsBySellerId);
  }

  onChangeSearchType(searchType: string) {
    this.getAllRestuarantsBySellerId = [];
    if (searchType === "2") {
      this.isRestuarant = true;
      this.isCategory = false;

      this.restuarantService.getListOfRestuarantsBySellerId(this.sellerId).subscribe((resp) => {
        resp.forEach((el) => {
          this.getAllRestuarantsBySellerId.push(el);
        })
      })

      console.log(this.getAllRestuarantsBySellerId);
    } else if (searchType === "3") {
      this.isRestuarant = false;
      this.isCategory = true;

      this.categoryService.getAllCategoriesBySellerId(this.sellerId).subscribe((resp) => {
        resp.forEach((el) => {
          this.getAllCategoriesBySellerId.push(el);
        })
      })
    } else {
      this.isRestuarant = false;
      this.isCategory = false;
    }
  }

  onSetRestuarantId(restuarantId: string) {
    console.log(restuarantId);
    this.searchValue = restuarantId;
  }

  onClickClearFilters() {
    this.isRestuarant = false;
    this.searchValue = "";
    this.getListOfEatablesBySellerId();
  }

  onClickFilterBySearchType(searchType: string) {
    this.getListOfEatablesBySeller = [];

    this.eatableService.getEatableBySearchType(this.sellerId, searchType, this.searchValue).subscribe((resp) => {
      resp.forEach((el) => {
        let TYPED_ARRAY = new Uint8Array(el.eatableFeaturedImage.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');

        el.imageFile = STRING_CHAR
        this.getListOfEatablesBySeller.push(el);
      })
    })
  }

  onClickUpdateEatable(eatableId: string) {
    this.router.navigate(['app/seller/update-eatable', eatableId]);
  }

  getListOfEatablesBySellerId() {
    this.getListOfEatablesBySeller = [];
    this.sellerId = sessionStorage.getItem("userId");

    this.eatableService.getAllEatablesBySellerId(this.sellerId).subscribe((resp) => {
      resp.forEach((el) => {
        let TYPED_ARRAY = new Uint8Array(el.eatableFeaturedImage.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');

        el.imageFile = STRING_CHAR
        this.getListOfEatablesBySeller.push(el);
      })
    });
  }

}
