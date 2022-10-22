import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { CategoryServiceService } from 'src/app/services/seller-services/category-service.service';
import { EatableServiceService } from 'src/app/services/seller-services/eatable-service.service';
import { RestuarantServiceService } from 'src/app/services/seller-services/restuarant-service.service';
import { Eatable } from 'src/app/shared/models/Eatable';

@Component({
  selector: 'app-add-eatables',
  templateUrl: './add-eatables.component.html',
  styleUrls: ['./add-eatables.component.css']
})
export class AddEatablesComponent implements OnInit {

  allAvailableCategories: any[] = [];
  allAvailableRestuarants: any[] = [];
  eatable = new Eatable();
  sellerId: any;
  base64Code!: string;
  addEatableForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryServiceService,
              private restuarantService: RestuarantServiceService, private eatableService: EatableServiceService,
              private notify: ToastrService) { }

  ngOnInit(): void {
    this.sellerId = sessionStorage.getItem("userId");
    this.createAddEatableForm();
    this.getAllSellerCategories();
    this.getAllrestuarants();
  }

  onSubmitAddEatableForm() {
    this.addEatableForm.controls['eatableFeaturedImage'].setValue(this.base64Code);

    this.eatable.eatableName = this.addEatableForm.controls['eatableName'].value;
    this.eatable.eatableDescription = this.addEatableForm.controls['eatableDescription'].value;
    this.eatable.selectedCategory = this.addEatableForm.controls['selectedCategory'].value;
    this.eatable.selectedRestuarant = this.addEatableForm.controls['selectedRestuarant'].value;
    this.eatable.eatablePrice = this.addEatableForm.controls['eatablePrice'].value;
    this.eatable.eatableFeaturedImage = this.addEatableForm.controls['eatableFeaturedImage'].value;

    this.eatableService.postEatableDetails(this.eatable).subscribe((resp) => {
      this.notify.success("Eatable Added Successflly.");
    },
    (err)=> {
      this.notify.error("There is an error Occur " + err);
    });
  }

  createAddEatableForm() {
    this.addEatableForm = this.formBuilder.group({
      eatableName: ['', Validators.required],
      eatableDescription: ['', Validators.required],
      selectedCategory: ['', Validators.required],
      selectedRestuarant: ['', Validators.required],
      eatablePrice: ['', Validators.required],
      eatableFeaturedImage: ['', Validators.required]
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

  getAllSellerCategories() {
    this.categoryService.getAllCategoriesBySellerId(this.sellerId).subscribe((resp) => {
      resp.forEach((el) => {
        this.allAvailableCategories.push(el);
      })
    })
  }

  getAllrestuarants() {
    this.restuarantService.getListOfRestuarantsBySellerId(this.sellerId).subscribe((resp) => {
      resp.forEach((el) => {
        this.allAvailableRestuarants.push(el);
      })
    })
  }

}
