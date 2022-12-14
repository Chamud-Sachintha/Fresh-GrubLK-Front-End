import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/customer-services/auth-service.service';
import { RegModel } from 'src/app/shared/models/RegModel';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  regModel = new RegModel();

  sellerSignInFormAppear = false;
  driverSignInFormAppear = false;
  customerSignInFormAppear = true;
  isLoading = false;

  customerSignInForm!: FormGroup;
  sellerSignInForm!: FormGroup;
  driverSignInForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthServiceService,
              private notify: ToastrService, private router: Router) { 
  }

  customerSignInFormBuild() {
    this.customerSignInForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  sellerSignInFormBuild() {
    this.sellerSignInForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  driverSignInFormBuild() {
    this.driverSignInForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.customerSignInFormBuild();
    this.sellerSignInFormBuild();
    this.driverSignInFormBuild();
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
    this.regModel.emailAddress = this.customerSignInForm.controls['userName'].value;
    this.regModel.password = this.customerSignInForm.controls['password'].value;

    this.authService.signInCustomer(this.regModel).subscribe((resp) => {
      this.router.navigate(['/app']);
      sessionStorage.setItem("userId", resp.id);
      sessionStorage.setItem("userEmail", resp.emailAddress);
      sessionStorage.setItem("role", 'C');
      this.notify.success("Sign-In Successfully.");
    },
    (err) => {
      this.router.navigate(['/auth']);
      if (err.status === 401) {
        this.notify.error("Invalid Username or Password.");
      } else {
        this.notify.error("Error Occur In " + err.message);
      }
    });
  }

  onSubmitSellerCredentials() {
    this.regModel.emailAddress = this.sellerSignInForm.controls['userName'].value;
    this.regModel.password = this.sellerSignInForm.controls['password'].value;

    this.authService.signInSeller(this.regModel).subscribe((resp) => {
      this.router.navigate(['/app/seller']);
      sessionStorage.setItem("userId", resp.id);
      sessionStorage.setItem("username" ,resp.emailAddress);
      sessionStorage.setItem("role", 'S');
      this.notify.success("Sign-In Successfully.");
    },
    (err) => {
      this.router.navigate(['/auth']);
      if (err.status === 401) {
        this.notify.error("Invalid Username or Password.");
      } else {
        this.notify.error("Error Occur In " + err.message);
      }
    });
  }

  onSubmitDriverCredentials() {
    this.regModel.emailAddress = this.driverSignInForm.controls['userName'].value;
    this.regModel.password = this.driverSignInForm.controls['password'].value;

    this.authService.signInDriver(this.regModel).subscribe((resp) => {
      this.router.navigate(['/app/driver']);
      sessionStorage.setItem("userId", resp.id);
      sessionStorage.setItem("username" ,resp.emailAddress);
      sessionStorage.setItem("role", 'D');
      this.notify.success("Sign-In Successfully.");
    },
    (err) => {
      this.router.navigate(['/auth']);
      if (err.status === 401) {
        this.notify.error("Invalid Username or Password.");
      } else {
        this.notify.error("Error Occur In " + err.message);
      }
    })
  }

}
