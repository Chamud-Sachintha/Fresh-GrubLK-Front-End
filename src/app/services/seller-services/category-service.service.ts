import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/shared/models/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private http: HttpClient) { }

  addNewCategoryDetails(newCategoryDetails: Category):Observable<any>  {
    const path = "http://localhost:3000/category/add-category";
    return this.http.post(path, newCategoryDetails);
  }
}
