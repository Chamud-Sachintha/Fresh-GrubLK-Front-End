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
  constructor() { }

  ngOnInit(): void {
  }

  onClickSellerFormAppear() {
    this.customerSignInFormAppear = false;
    this.sellerSignInFormAppear = true;
    this.driverSignInFormAppear = false;
  }

  onClickCustomerFormApper() {
    this.customerSignInFormAppear = true;
    this.sellerSignInFormAppear = false;
    this.driverSignInFormAppear = false;
  }

  onClickDriverFormAppear() {
    this.customerSignInFormAppear = false;
    this.sellerSignInFormAppear = false;
    this.driverSignInFormAppear = true;
  }

}
