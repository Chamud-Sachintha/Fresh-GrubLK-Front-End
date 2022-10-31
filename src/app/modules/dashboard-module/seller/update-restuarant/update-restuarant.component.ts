import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { RestuarantServiceService } from 'src/app/services/seller-services/restuarant-service.service';
import { Restuarant } from 'src/app/shared/models/Restuarant';

@Component({
  selector: 'app-update-restuarant',
  templateUrl: './update-restuarant.component.html',
  styleUrls: ['./update-restuarant.component.css']
})
export class UpdateRestuarantComponent implements OnInit {

  restuarant = new Restuarant();
  restuarantUpdateForm!: FormGroup;
  myImage!: Observable<any>;
  base64Code!: any;
  selectedRestuarantDetails: any[] = [];
  restuarantId!: string;
  currentImage!: string;

  constructor(private formBuilder: FormBuilder, private restuarantService: RestuarantServiceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.restuarantId = params['id']; // (+) converts string 'id' to a number
    });

    this.createUpdateRestuarantFRorm();
    this.getSelectedRestuarantDetails();
  }

  getSelectedRestuarantDetails() {
    this.restuarantService.getRestuarantByRestuarantId(this.restuarantId).subscribe((resp) => {
      resp.forEach((el) => {
        this.selectedRestuarantDetails.push(el);
      })

      this.selectedRestuarantDetails.forEach((el) => {
        this.restuarantUpdateForm.controls['restuarantName'].setValue(el.restuarantName);
        this.restuarantUpdateForm.controls['restuarantDescription'].setValue(el.description);
        this.restuarantUpdateForm.controls['firstAddressLine'].setValue(el.addressLineFirst);
        this.restuarantUpdateForm.controls['secondAddressLine'].setValue(el.addressLineSecond);
        this.restuarantUpdateForm.controls['location'].setValue(el.location);
        this.restuarantUpdateForm.controls['mobileNumber'].setValue(el.frontMobile);
        this.restuarantUpdateForm.controls['lanLine'].setValue(el.landMobile);

        let TYPED_ARRAY = new Uint8Array(el.imageFile.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');

        el.imageFile = STRING_CHAR
        this.currentImage = el.imageFile;
      })
    })
  }

  createUpdateRestuarantFRorm() {
    this.restuarantUpdateForm = this.formBuilder.group({
      restuarantName: ['', Validators.required],
      restuarantDescription: ['', Validators.required],
      featuredImage: ['', Validators.required],
      firstAddressLine: ['', Validators.required],
      secondAddressLine: '',
      location: ['', Validators.required],
      lanLine: ['', Validators.required],
      mobileNumber: ['', Validators.required]
    });
  }

  onSubmitRestuarantUpdateForm() {
    console.log(this.restuarantUpdateForm);
    this.restuarantUpdateForm.controls['featuredImage'].setValue(this.base64Code === "" ? this.currentImage : this.base64Code);

    console.log(sessionStorage.getItem("userId"));
    this.restuarant.sellerId = sessionStorage.getItem("userId");
    this.restuarant.restuarantName = this.restuarantUpdateForm.controls['restuarantName'].value;
    this.restuarant.restuarantDescription = this.restuarantUpdateForm.controls['restuarantDescription'].value;
    this.restuarant.featuredImage = this.restuarantUpdateForm.controls['featuredImage'].value;
    this.restuarant.firstAddressLine = this.restuarantUpdateForm.controls['firstAddressLine'].value;
    this.restuarant.secondAddressLine = this.restuarantUpdateForm.controls['secondAddressLine'].value;
    this.restuarant.location = this.restuarantUpdateForm.controls['location'].value;
    this.restuarant.lanLine = this.restuarantUpdateForm.controls['lanLine'].value;
    this.restuarant.mobileNumber = this.restuarantUpdateForm.controls['mobileNumber'].value;

    this.restuarantService.updaterestuarantDetailsByRestuarantId(this.restuarant, this.restuarantId).subscribe((resp) => {
      console.log(resp);
    })
  }

  onChangeImage = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.convertToBase64Code(file);
  }

  convertToBase64Code(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((d) => {
      console.log(d);
      this.base64Code = d;
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      subscriber.next(fileReader.result);

      subscriber.complete();
    }

    fileReader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    }
  }

}
