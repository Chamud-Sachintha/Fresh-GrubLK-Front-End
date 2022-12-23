import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RatingServiceService } from 'src/app/services/customer-services/rating-service.service';
import { Rating } from 'src/app/shared/models/Rating';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.css']
})
export class RatingDialogComponent implements OnInit {

  ratingDetails = new Rating();
  isDriver: boolean = false;
  isRestuarant: boolean = false;
  ratingValue!: number;

  constructor(@Inject(MAT_DIALOG_DATA) public mydata: any,private ratingService: RatingServiceService,
              private notify: ToastrService, private dialogRef: MatDialogRef<RatingDialogComponent>) { }

  ngOnInit(): void {
    this.isDriver = this.mydata.isDriver;
    this.isRestuarant = this.mydata.isRestuarant;
  }

  onSumbitRatingValueByTypeAndId(type: string) {
    if (type === 'R') {
      this.ratingDetails.ratingType = 'R';
      this.ratingDetails.ratingTypeSec = this.mydata.restuarantId;
    } else {
      this.ratingDetails.ratingType = 'D';
      this.ratingDetails.ratingTypeSec = this.mydata.driverId;
    }

    this.ratingDetails.orderId = this.mydata.orderId;
    this.ratingDetails.ratingValue = this.ratingValue;

    this.ratingService.createRatingByTypeAndId(this.ratingDetails).subscribe((data) => {
      this.notify.success("Rarting Provided.");
      this.dialogRef.close();
    },(err) => {
      this.notify.error("There is an Error Occued." + err);
      this.dialogRef.close();
    })
  }
}
