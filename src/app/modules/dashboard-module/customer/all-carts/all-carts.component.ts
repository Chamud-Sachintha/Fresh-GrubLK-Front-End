import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderServiceService } from 'src/app/services/customer-services/order-service.service';

@Component({
  selector: 'app-all-carts',
  templateUrl: './all-carts.component.html',
  styleUrls: ['./all-carts.component.css']
})
export class AllCartsComponent implements OnInit {

  userId!: any;
  allCartsList: any[] = []
  constructor(private orderingService: OrderServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCartsByCustomerId();
    console.log(this.allCartsList);
  }

  getAllCartsByCustomerId() {
    this.userId = sessionStorage.getItem("userId");

    this.orderingService.getAllCartsByCustomerId(this.userId).subscribe((resp) => {
      resp.forEach((el) => {
        let TYPED_ARRAY = new Uint8Array(el.imageFile.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');

        el.imageFile = STRING_CHAR
        this.allCartsList.push(el);
      })
    })
  }

  goToCartItemsPage(restuarantId: string) {
    this.router.navigate(['app/customer/view-cart', restuarantId]);
  }

}
