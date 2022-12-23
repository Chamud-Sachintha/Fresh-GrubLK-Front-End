import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../../shared/models/Rating';

@Injectable({
  providedIn: 'root'
})
export class RatingServiceService {

  constructor(private http: HttpClient) { }

  createRatingByTypeAndId(ratingDetails: Rating) {
    const path = "http://localhost:3000/customer/provideRatingForRestuarant";
    return this.http.post(path, ratingDetails);
  }

  getRestuarantRatingForOrder(orderId: string, ratingType: string):Observable<boolean> {
    const path = "http://localhost:3000/customer/getRestuarantRatingByOrderId?" + "orderId=" + orderId + "&ratingType=" + ratingType;
    return this.http.get<boolean>(path);
  }
}
