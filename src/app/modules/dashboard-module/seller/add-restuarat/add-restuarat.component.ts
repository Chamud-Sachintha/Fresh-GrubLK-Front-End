import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { RestuarantServiceService } from 'src/app/services/seller-services/restuarant-service.service';
import { Restuarant } from 'src/app/shared/models/Restuarant';

@Component({
  selector: 'app-add-restuarat',
  templateUrl: './add-restuarat.component.html',
  styleUrls: ['./add-restuarat.component.css']
})
export class AddRestuaratComponent implements OnInit {

  restuarant = new Restuarant();
  myImage!: Observable<any>;
  base64Code!: any;
  restuarantAddForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private restuarantService: RestuarantServiceService
              ,private notify: ToastrService) { }

  ngOnInit(): void {
    this.createAddRestuarantFRorm();
  }

  createAddRestuarantFRorm() {
    this.restuarantAddForm = this.formBuilder.group({
      restuarantName: ['', Validators.required],
      restuarantDescription: ['', Validators.required],
      featuredImage: ['', Validators.required],
      firstAddressLine: ['', Validators.required],
      secondAddressLine: '',
      city: ['', Validators.required],
      state: ['', Validators.required],
      lanLine: ['', Validators.required],
      mobileNumber: ['', Validators.required]
    });
  }

  onSubmitRestuarantAddForm() {
    this.restuarantAddForm.controls['featuredImage'].setValue(this.base64Code);
    
    console.log(sessionStorage.getItem("userId"));
    this.restuarant.sellerId = sessionStorage.getItem("userId");
    this.restuarant.restuarantName = this.restuarantAddForm.controls['restuarantName'].value;
    this.restuarant.restuarantDescription = this.restuarantAddForm.controls['restuarantDescription'].value;
    this.restuarant.featuredImage = this.restuarantAddForm.controls['featuredImage'].value;
    this.restuarant.firstAddressLine = this.restuarantAddForm.controls['firstAddressLine'].value;
    this.restuarant.secondAddressLine = this.restuarantAddForm.controls['secondAddressLine'].value;
    this.restuarant.city = this.restuarantAddForm.controls['city'].value;
    this.restuarant.state = this.restuarantAddForm.controls['state'].value;
    this.restuarant.lanLine = this.restuarantAddForm.controls['lanLine'].value;
    this.restuarant.mobileNumber = this.restuarantAddForm.controls['mobileNumber'].value;

    console.log(this.restuarant);
    this.restuarantService.addNewRestuarant(this.restuarant).subscribe(resp => {
      this.notify.success("Restuarant Added Successfully.");
    },
    (err) => {
      this.notify.error("There is an Error Occur " + err);
    });
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
