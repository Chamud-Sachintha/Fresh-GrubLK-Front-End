import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerAuthServiceService } from 'src/app/services/customer-services/customer-auth-service.service';

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

  customerSignInForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private customerService: CustomerAuthServiceService,
              private router: Router) { 
    this.customerSignInForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

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

  onSubmitCustomerCredentials() {
    console.log(this.customerSignInForm.value);
    if (this.customerService.signInCustomer(this.customerSignInForm.value)) {
      this.router.navigate(['/app']);
    } else {
      this.router.navigate(['/auth']);
    }
  }

}
