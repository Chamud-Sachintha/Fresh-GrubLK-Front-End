import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestuarantServiceService } from 'src/app/services/seller-services/restuarant-service.service';
import { Restuarant } from 'src/app/shared/models/Restuarant';

@Component({
  selector: 'app-explore-restuarant',
  templateUrl: './explore-restuarant.component.html',
  styleUrls: ['./explore-restuarant.component.css']
})
export class ExploreRestuarantComponent implements OnInit {

  restuarantName!: string;
  featuredImage!: string;
  restuarantDescription!: string;
  restuarantAddress!: string;
  selectedRestuarantDetails: any[] = [];
  restuarantId!: string;

  constructor(private route: ActivatedRoute, private restuarantService: RestuarantServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.restuarantId = params['id']; // (+) converts string 'id' to a number
    });

    this.getSelectedRestuarantDetails();
    console.log(this.selectedRestuarantDetails);
  }

  getSelectedRestuarantDetails() {
    this.restuarantService.getRestuarantByRestuarantId(this.restuarantId).subscribe((resp) => {
      resp.forEach((el) => {
        this.restuarantName = el.restuarantName;
        this.featuredImage = this.returnImageStringChar(el.imageFile.data);
        this.restuarantDescription = el.description;
        this.restuarantAddress = el.addressLineFirst;
        console.log(el);
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

}
