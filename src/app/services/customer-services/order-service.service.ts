import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/shared/models/Cart';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http: HttpClient) { }

  getCategoriesOfSelectedRestuarant(restuarantId: string):Observable<any[]> {
    const path = "http://localhost:3000/customer/getCategoriesOfSelectedRestuarant?" + "restuarantId=" + restuarantId;
    return this.http.get<any[]>(path);
  }

  getEatableListBySelectedRestuarant(restuarantId: string): Observable<any[]> {
    const path = "http://localhost:3000/eatable/getEatablesBelongsToRestuarant?" + "restuarantId=" + restuarantId;
    return this.http.get<any[]>(path);
  }

  initializeUserCartOrAddeatablesToCart(cartDetails: Cart) {
    const path = "http://localhost:3000/customer/addToCart";
    return this.http.post(path, cartDetails);
  }

  getAllCartItemsByCustomer(userId: string): Observable<any[]> {
    const path = "http://localhost:3000/customer/getAllCartItemsByCustomer/search?" + "userId=" + userId;
    return this.http.get<any[]>(path);
  }
}
