import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RestuarantServiceService } from 'src/app/services/seller-services/restuarant-service.service';
import { Restuarant } from 'src/app/shared/models/Restuarant';

@Component({
  selector: 'app-manage-restuarants',
  templateUrl: './manage-restuarants.component.html',
  styleUrls: ['./manage-restuarants.component.css']
})
export class ManageRestuarantsComponent implements OnInit {

  sellerId!: any;
  listOfRestuarants : any[] = [];
  constructor(private restuarantService: RestuarantServiceService, private notify: ToastrService) { }

  ngOnInit(): void {
    this.getAllrestuarantsBySellerId();
    console.log(this.listOfRestuarants);
  }

  getAllrestuarantsBySellerId() {
    this.sellerId = sessionStorage.getItem("userId");

    this.restuarantService.getListOfRestuarantsBySellerId(this.sellerId).subscribe((resp) => {
      resp.forEach((el) => {
        let TYPED_ARRAY = new Uint8Array(el.imageFile.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');

        el.imageFile = STRING_CHAR
        this.listOfRestuarants.push(el);
      });
    },
    (err) => {
      this.notify.error("There is an Error Occur in " + err);
    });
  }
}
