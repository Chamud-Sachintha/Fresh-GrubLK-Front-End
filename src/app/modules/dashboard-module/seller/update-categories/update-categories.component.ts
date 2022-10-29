import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { CategoryServiceService } from 'src/app/services/seller-services/category-service.service';
import { Category } from 'src/app/shared/models/Category';

@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.css']
})
export class UpdateCategoriesComponent implements OnInit {

  category = new Category();
  myImage!: Observable<any>;
  base64Code!: any;
  updateCategoryForm!: FormGroup;
  selectedCategoryDetails: any[] = [];
  currentImage!: string;
  categoryId!: string;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private categoryservice: CategoryServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = params['id']; // (+) converts string 'id' to a number
    });

    this.createUpdateCategoryForm();
    this.getSelectedCategoryDetails();
    console.log(this.selectedCategoryDetails);
  }

  createUpdateCategoryForm() {
    this.updateCategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      categoryDescription: ['', Validators.required],
      categoryImage: ['', Validators.required]
    });
  }

  getSelectedCategoryDetails() {
    this.categoryservice.getCategoryDetailsByCategoryId(this.categoryId).subscribe((resp) => {
      resp.forEach((el) => {
        this.selectedCategoryDetails.push(el)
      })

      this.selectedCategoryDetails.forEach((el) => {
        this.updateCategoryForm.controls['categoryName'].setValue(el.categoryName);
        this.updateCategoryForm.controls['categoryDescription'].setValue(el.categoryDescription);
      })
    })
  }

  onSubmitAddCategoryDetailsForm() {
    this.updateCategoryForm.controls['categoryImage'].setValue(this.base64Code === "" ? this.currentImage : this.base64Code);

    this.category.sellerId = sessionStorage.getItem("userId");
    this.category.categoryName = this.updateCategoryForm.controls['categoryName'].value;
    this.category.categoryDescription = this.updateCategoryForm.controls['categoryDescription'].value;
    this.category.categoryImage = this.updateCategoryForm.controls['categoryImage'].value;

    //have to create update api for category
    this.categoryservice.manageSelectedCategoryDetailsByCategoryId(this.categoryId, this.category).subscribe((resp) => {
      console.log(resp);
    },(err) => {

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
