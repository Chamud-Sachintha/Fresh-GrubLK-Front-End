import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/shared/models/Cart';
import { OrderDetails } from 'src/app/shared/models/OrderDetails';
import { Profile } from 'src/app/shared/models/Profile';

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

  getAllCartItemsByCustomer(userId: string, restuarantId: string): Observable<any[]> {
    const path = "http://localhost:3000/customer/getAllCartItemsByCustomerAndEachCart/search?" + "userId=" + userId + "&restuarantId=" + restuarantId;
    return this.http.get<any[]>(path);
  }

  placeNewOrderDetailsByCustomer(orderDetails: OrderDetails) {
    const path = "http://localhost:3000/customer/placeOrder";
    return this.http.post(path, orderDetails);
  }

  getAllOrdersByCustomerId(userId: string): Observable<any[]> {
    const path = "http://localhost:3000/customer/getAllOrdersByCustomer?" + "userId=" + userId;
    return this.http.get<any[]>(path);
  }

  getAllCartsByCustomerId(userId: string):Observable<any[]> {
    const path = "http://localhost:3000/customer/getAllCartsByCustomerId/search?" + "userId=" + userId;
    return this.http.get<any[]>(path);
  }

  getAssignedDriverForDeliverByOrderIdAndOrderStatus(orderId: string):Observable<Profile[]> {
    const path = "http://localhost:3000/customer/search/getAssignedDriverForOrderByOrderId?" + "orderId=" + orderId;
    return this.http.get<Profile[]>(path);
  }
}
