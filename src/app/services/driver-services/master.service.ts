import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  assignDriverToOrder(lat: string, long: string) {
    const path = "http://localhost:3000/driver/asign/driver?" + "latitudeOfRestuarant=" + lat + "&longitudeOfRestuarant=" + long;
    return this.http.get(path);
  }
}
