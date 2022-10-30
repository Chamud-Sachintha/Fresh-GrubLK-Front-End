import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { CategoryServiceService } from 'src/app/services/seller-services/category-service.service';
import { EatableServiceService } from 'src/app/services/seller-services/eatable-service.service';
import { RestuarantServiceService } from 'src/app/services/seller-services/restuarant-service.service';
import { Eatable } from 'src/app/shared/models/Eatable';

@Component({
  selector: 'app-update-eatable',
  templateUrl: './update-eatable.component.html',
  styleUrls: ['./update-eatable.component.css']
})
export class UpdateEatableComponent implements OnInit {

  allAvailableCategories: any[] = [];
  allAvailableRestuarants: any[] = [];
  selectedEatableDetails: any[] = [];
  eatable = new Eatable();
  base64Code!: string;
  updateEatableForm!: FormGroup;
  sellerId!: any;
  eatableId!: any;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryServiceService,
              private restuarantService: RestuarantServiceService, private eatableService: EatableServiceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eatableId = params['id'];
    })
    this.sellerId = sessionStorage.getItem("userId");

    this.getSelectedEatableDetailsByEatableId();
    this.createUpdateEatableForm();
    this.getAllSellerCategories();
    this.getAllrestuarants();
  }

  onSubmitUpdateEatableForm() {

  }

  getSelectedEatableDetailsByEatableId() {
    this.eatableService.getEatableDetailsByEatableId(this.eatableId).subscribe((resp) => {
      resp.forEach((el) => {
        this.selectedEatableDetails.push(el);
      })

      this.selectedEatableDetails.forEach((el) => {
        this.updateEatableForm.controls['eatableName'].setValue(el.eatableName);
        this.updateEatableForm.controls['eatableDescription'].setValue(el.eatableDescription);
        this.updateEatableForm.controls['selectedCategory'].setValue(el.selectedCategory);
        this.updateEatableForm.controls['selectedRestuarant'].setValue(el.selectedRestuarant);
        this.updateEatableForm.controls['eatablePrice'].setValue(el.eatablePrice);
      })
    })
  }

  createUpdateEatableForm() {
    this.updateEatableForm = this.formBuilder.group({
      eatableName: ['', Validators.required],
      eatableDescription: ['', Validators.required],
      selectedCategory: ['', Validators.required],
      selectedRestuarant: ['', Validators.required],
      eatablePrice: ['', Validators.required],
      eatableFeaturedImage: ['', Validators.required]
    });
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
