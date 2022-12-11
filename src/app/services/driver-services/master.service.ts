import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliveryRequest } from 'src/app/shared/models/DeliveryRequest';
import { Profile } from 'src/app/shared/models/Profile';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  assignDriverToOrder(lat: string, long: string, orderId: string) {
    const path = "http://localhost:3000/driver/asign/driver?" + "latitudeOfRestuarant=" + lat + "&longitudeOfRestuarant=" + long
                  + "&orderId=" + orderId;
    return this.http.get(path);
  }

  getAssignedDriverDetails(orderId: string):Observable<Profile> {
    const path = "http://localhost:3000/driver/search/assignedDriver?" + "orderId=" + orderId;
    return this.http.get<Profile>(path);
  }

  getAlldeliveryRequetsByDriverId(driverId: string):Observable<DeliveryRequest[]> {
    const path = "http://localhost:3000/driver/search/getAvailableDeliveryRequestsByDriverId?" + "userId=" + driverId;
    return this.http.get<DeliveryRequest[]>(path);
  }

  getDeliveryRequestDetailsByOrderId(orderId: string):Observable<any[]> {
    const path = "http://localhost:3000/driver/search/getDeliveryRequestDetails?" + "orderId=" + orderId;
    return this.http.get<any[]>(path);
  }

  getDeliveryRequestStatusByOrderId(orderId: string):Observable<DeliveryRequest> {
    const path = "http://localhost:3000/driver/search/getDeliveryStatusByOrderId?" + "orderId=" + orderId;
    return this.http.get<DeliveryRequest>(path);
  }

  updateDeliveryStatusByOrderId(orderId: string, deliveryStatus: string) {
    const path = "http://localhost:3000/driver/update/deliveryStatusByOrderId?" + "orderId=" + orderId
                  + "&deliveryStatus=" + deliveryStatus;
    return this.http.get(path);
  }
}
