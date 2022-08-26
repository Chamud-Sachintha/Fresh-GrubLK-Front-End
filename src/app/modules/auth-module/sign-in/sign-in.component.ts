import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  sellerSignInFormAppear = false;
  driverSignInFormAppear = false;
  customerSignInFormAppear = true;
  isLoading = false;
  constructor() { }

  ngOnInit(): void {
  }

  bringFalse() {
    this.isLoading = true;
    this.sellerSignInFormAppear = false;
    this.customerSignInFormAppear = false;
    this.driverSignInFormAppear = false;
  }

  onClickSellerFormAppear() {
    this.bringFalse();
    setTimeout(() => { 
      this.customerSignInFormAppear = false;
      this.sellerSignInFormAppear = true;
      this.driverSignInFormAppear = false;
      this.isLoading = false; 
    }, 2000);
  }

  onClickCustomerFormApper() {
    this.bringFalse();
    setTimeout(() => {
      this.customerSignInFormAppear = true;
      this.sellerSignInFormAppear = false;
      this.driverSignInFormAppear = false;
      this.isLoading = false;
    }, 2000);
  }

  onClickDriverFormAppear() {
    this.bringFalse();
    setTimeout(() => {
      this.customerSignInFormAppear = false;
      this.sellerSignInFormAppear = false;
      this.driverSignInFormAppear = true;
      this.isLoading = false;
    }, 2000);
  }

}
