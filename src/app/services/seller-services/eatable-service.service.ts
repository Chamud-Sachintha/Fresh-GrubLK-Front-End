import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eatable } from 'src/app/shared/models/Eatable';

@Injectable({
  providedIn: 'root'
})
export class EatableServiceService {

  constructor(private http: HttpClient) { }

  postEatableDetails(eatableDetails: Eatable) {
    console.log(eatableDetails);
    
    const path = "http://localhost:3000/eatable/add-eatable";
    return this.http.post(path, eatableDetails);
  }

  getAllEatablesBySellerId(sellerId: string): Observable<any[]> {
    const path = "http://localhost:3000/eatable/getAllEatablesBySellerId?" + "sellerId=" + sellerId;
    return this.http.get<any[]>(path);
  }

  getEatableDetailsByEatableId(eatableId: string):Observable<any[]> {
    const path = "http://localhost:3000/eatable/getEatableDetailsByEatableId?" + "eatableId=" + eatableId;
    return this.http.get<any[]>(path);
  }

  getEatablesByOrderId(orderId: string): Observable<any[]> {
    const path = "http://localhost:3000/eatable/getEatablesByOrderId?" + "orderId=" + orderId;
    return this.http.get<any[]>(path);
  }
}
