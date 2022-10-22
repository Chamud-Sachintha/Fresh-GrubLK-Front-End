import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { CategoryServiceService } from 'src/app/services/seller-services/category-service.service';
import { Category } from 'src/app/shared/models/Category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  sellerId: any;
  category = new Category();
  listOfCategories: any[] = [];

  myImage!: Observable<any>;
  base64Code!: any;
  addCategoryForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryServiceService,
              private notify: ToastrService) { }

  ngOnInit(): void {
    this.createAddCategoryForm();
    this.getAllAvailableCategories();
    console.log(this.listOfCategories);
  }

  createAddCategoryForm() {
    this.addCategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      categoryDescription: ['', Validators.required],
      categoryImage: ['', Validators.required]
    });
  }

  onSubmitAddCategoryDetailsForm() {
    this.addCategoryForm.controls['categoryImage'].setValue(this.base64Code);

    this.category.sellerId = sessionStorage.getItem("userId");
    this.category.categoryName = this.addCategoryForm.controls['categoryName'].value;
    this.category.categoryDescription = this.addCategoryForm.controls['categoryDescription'].value;
    this.category.categoryImage = this.addCategoryForm.controls['categoryImage'].value;

    this.categoryService.addNewCategoryDetails(this.category).subscribe((resp) => {
      this.notify.success("Category Details Added Successfully.");
    },
    (err) => {
      this.notify.error("There is An Error Occur in " + err);
    });
  }

  getAllAvailableCategories() {
    this.sellerId = sessionStorage.getItem("userId");
    this.categoryService.getAllCategoriesBySellerId(this.sellerId).subscribe((resp) => {
      resp.forEach((el) => {
        let TYPED_ARRAY = new Uint8Array(el.categoryImage.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '');

        el.imageFile = STRING_CHAR
        this.listOfCategories.push(el);
      });
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
