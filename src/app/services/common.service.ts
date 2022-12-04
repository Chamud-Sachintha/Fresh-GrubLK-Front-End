import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { CommonDetails } from '../shared/models/CommonDetails';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getDeliveryFeeFromCommonPrices(code: string):Observable<CommonDetails> {
    const path = "http://localhost:3000/common/getDeliveryFee?" + "code=" + code;
    return this.http.get<CommonDetails>(path);
  }
}
