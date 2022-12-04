import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderRequestsService {

  constructor(private http: HttpClient) { }

  getAllOrderRequestsByEachSeller(sellerId: string): Observable<any[]> {
    const path = "http://localhost:3000/seller/order-requests/search?" + "sellerId=" + sellerId;
    return this.http.get<any[]>(path);
  }

  getAlleatablesByEachRestuarantByEachOrder(orderId: string): Observable<any[]> {
    const path = "http://localhost:3000/seller/manage-order/search?" + "orderId=" + orderId;
    return this.http.get<any[]>(path);
  }

  manageOrderStatusByOrderId(orderId: string, orderStatus: string) {
    const path = "http://localhost:3000/seller/manage-order/updateOrderStatus?" + "orderId=" + orderId + "&orderStatus=" + orderStatus;
    return this.http.get(path, {responseType: 'text'});
  }

  getAllOngoingOrdersBySeller(sellerId: string):Observable<any[]> {
    const path = "http://localhost:3000/seller/order-requests/ongoing/search?" + "sellerId=" + sellerId;
    return this.http.get<any[]>(path);
  }
}
