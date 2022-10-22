import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderServiceService } from 'src/app/services/customer-services/order-service.service';
import { RestuarantServiceService } from 'src/app/services/seller-services/restuarant-service.service';
import { Cart } from 'src/app/shared/models/Cart';

@Component({
  selector: 'app-explore-restuarant',
  templateUrl: './explore-restuarant.component.html',
  styleUrls: ['./explore-restuarant.component.css']
})
export class ExploreRestuarantComponent implements OnInit {

  cart = new Cart();
  restuarantName!: string;
  featuredImage!: string;
  restuarantDescription!: string;
  restuarantAddress!: string;
  selectedRestuarantDetails: any[] = [];
  getListCategoriesOfSelectedRestuarant: any[] = [];
  getEatableListByRestuarant: any[] = [];
  restuarantId!: string;
  eatableQuantity: number = 0;

  constructor(private route: ActivatedRoute, private restuarantService: RestuarantServiceService,
    private orderingService: OrderServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.restuarantId = params['id']; // (+) converts string 'id' to a number
    });

    this.getSelectedRestuarantDetails();
    this.getCategoriesOfSelectedRestuarant();
    this.getEatableListBySelectedRestuarant();
  }

  addeatableToCart(eatableId: string, quantity: string) {
    this.cart.userId = sessionStorage.getItem("userId");
    this.cart.eatableId = eatableId;
    this.cart.eatableQuantity = parseInt(quantity);

    this.orderingService.initializeUserCartOrAddeatablesToCart(this.cart).subscribe((resp) => {
      console.log(resp);
    },
    (err) => {
      console.log(err);
    })
  }

  getEatableListBySelectedRestuarant() {
    this.orderingService.getEatableListBySelectedRestuarant(this.restuarantId).subscribe((resp) => {
      resp.forEach((el) => {
        let TYPED_ARRAY = new Uint8Array(el.eatableFeaturedImage.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');

        el.eatableFeaturedImage = STRING_CHAR
        this.getEatableListByRestuarant.push(el);
      });
    });
  }

  getSelectedRestuarantDetails() {
    this.restuarantService.getRestuarantByRestuarantId(this.restuarantId).subscribe((resp) => {
      resp.forEach((el) => {
        this.restuarantName = el.restuarantName;
        this.featuredImage = this.returnImageStringChar(el.imageFile.data);
        this.restuarantDescription = el.description;
        this.restuarantAddress = el.addressLineFirst;
      })
    })
  }

  returnImageStringChar(imageFile: any[]) {
    let TYPED_ARRAY = new Uint8Array(imageFile);
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '');

    return STRING_CHAR;
  }

  getCategoriesOfSelectedRestuarant() {
    this.orderingService.getCategoriesOfSelectedRestuarant(this.restuarantId).subscribe((resp) => {
      resp.forEach((el) => {
        this.getListCategoriesOfSelectedRestuarant.push(el);
      });
    });
  }

}
