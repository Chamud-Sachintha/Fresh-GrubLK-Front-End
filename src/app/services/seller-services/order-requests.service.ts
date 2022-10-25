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
}