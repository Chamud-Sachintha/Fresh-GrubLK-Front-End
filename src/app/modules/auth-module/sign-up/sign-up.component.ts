import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isCustomerRegFormAppear = true;
  isSellerRegFormAppear = false;
  isDriverRegFormAppear = false;
  isLoading = false;
  constructor() { }

  ngOnInit(): void {
  }

  bringFalse() {
    this.isLoading = true;
    this.isCustomerRegFormAppear = false;
    this.isSellerRegFormAppear = false;
    this.isDriverRegFormAppear = false;
  }

  showCustomerRegForm() {
    this.bringFalse();
    setTimeout(() => { 
      this.isCustomerRegFormAppear = true;
      this.isSellerRegFormAppear = false;
      this.isDriverRegFormAppear = false;
      this.isLoading = false; 
    }, 2000);
  }

  showSellerRegForm() {
    this.bringFalse();
    setTimeout(() => { 
      this.isCustomerRegFormAppear = false;
      this.isSellerRegFormAppear = true;
      this.isDriverRegFormAppear = false;
      this.isLoading = false; 
    }, 2000);
  }

  showDriverRegForm() {
    this.bringFalse();
    setTimeout(() => { 
      this.isCustomerRegFormAppear = false;
      this.isSellerRegFormAppear = false;
      this.isDriverRegFormAppear = true;
      this.isLoading = false; 
    }, 2000);
  }

}
