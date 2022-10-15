import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Restuarant } from 'src/app/shared/models/Restuarant';

@Injectable({
  providedIn: 'root'
})
export class RestuarantServiceService {

  constructor(private http: HttpClient) { }

  addNewRestuarant(newRestuarant: Restuarant): Observable<any> {
    const path = "http://localhost:3000/seller/add-restuarant";
    return this.http.post(path, newRestuarant);
  }

  getListOfrestuarants(): Observable<any[]> {
    const path = "http://localhost:3000/seller/restuarants";
    // return this.http.get<Restuarant[]>(path);
    return this.http.get<any[]>(path);
  }

  getListOfRestuarantsBySellerId(sellerId: any): Observable<any[]> {
    const path = "http://localhost:3000/seller/restuarantsById/search?" + "sellerId=" + sellerId;
    return this.http.get<any[]>(path);
  }

  getRestuarantByRestuarantId(restuarantId: string): Observable<any[]> {
    const path = "http://localhost:3000/seller/restuarant/search?" + "restuarantId=" + restuarantId;
    return this.http.get<any[]>(path);
  }
}
