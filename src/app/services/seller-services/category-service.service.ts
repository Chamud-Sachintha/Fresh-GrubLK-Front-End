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

  getAllCategories(): Observable<any[]> {
    const path = "http://localhost:3000/category/getAllCategories";
    return this.http.get<any[]>(path);
  }

  getAllCategoriesBySellerId(sellerId: string): Observable<any[]> {
    const path = "http://localhost:3000/category/categoriesBySellerId?" + "sellerId=" + sellerId;
    return this.http.get<any[]>(path);
  }

  getCategoryDetailsByCategoryId(categoryId: string):Observable<any[]> {
    const path = "http://localhost:3000/category/categoriesByCategoryId?" + "categoryId=" + categoryId;
    return this.http.get<any[]>(path);
  }

  manageSelectedCategoryDetailsByCategoryId(categoryId: string, newCategoryDetails: Category):Observable<any[]> {
    const path = "http://localhost:3000/category/updateCategoryDetailsByCategoryId?" + "categoryId=" + categoryId;
    return this.http.put<any[]>(path, newCategoryDetails);
  }

  deleteCategoryDetailsByCategoryId(categoryId: string) {
    const path = "http://localhost:3000/category/deleteCategorydetailsByCategoryId?" + "categoryId=" + categoryId;
    return this.http.get<any[]>(path);
  }
}
