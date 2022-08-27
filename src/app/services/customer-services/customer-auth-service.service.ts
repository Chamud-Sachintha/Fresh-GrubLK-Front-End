import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthServiceService {

  constructor() { }

  signInCustomer(customerDetails: any) {
    if (customerDetails.userName === 'chamud' && customerDetails.password === '111') {
      return true;
    } else {
      return false;
    }
  }
}
