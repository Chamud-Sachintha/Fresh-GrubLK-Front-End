import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EatableServiceService } from 'src/app/services/seller-services/eatable-service.service';

@Component({
  selector: 'app-manage-eatables',
  templateUrl: './manage-eatables.component.html',
  styleUrls: ['./manage-eatables.component.css']
})
export class ManageEatablesComponent implements OnInit {

  sellerId: any;
  getListOfEatablesBySeller: any[] = [];
  constructor(private eatableService: EatableServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getListOfEatablesBySellerId();
    console.log(this.getListOfEatablesBySeller);
  }

  onClickUpdateEatable(eatableId: string) {
    this.router.navigate(['app/seller/update-eatable', eatableId]);
  }

  getListOfEatablesBySellerId() {
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
