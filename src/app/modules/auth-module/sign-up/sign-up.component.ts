import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/customer-services/auth-service.service';
import { RegModel } from 'src/app/shared/models/RegModel';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  regModel = new RegModel();

  isCustomerRegFormAppear = true;
  isSellerRegFormAppear = false;
  isDriverRegFormAppear = false;
  isLoading = false;

  customerRegForm!: FormGroup;
  sellerRegForm!: FormGroup;

  constructor(private formBulder: FormBuilder, private authService: AuthServiceService,
              private notify: ToastrService, private router: Router) {
  }

  customerFormBuild() {
    this.customerRegForm = this.formBulder.group({
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
      confPassword: ['', Validators.required]
    });
  }

  sellerFormBuild() {
    this.sellerRegForm = this.formBulder.group({
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
      confPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.customerFormBuild();
    this.sellerFormBuild();
  }

  onSubmitCustomerRegForm() {
    this.regModel.emailAddress = this.customerRegForm.controls['emailAddress'].value;
    this.regModel.password = this.customerRegForm.controls['password'].value;

    this.authService.signUpUser(this.regModel).subscribe((res) => {
      this.router.navigate(['/auth']);
      this.notify.success("Member Sign-Up Successfully.");
    },
    (err) => {
      this.notify.error("There is Error Occur " + err);
    });
  }

  onSubmitSellerRegForm() {
    this.regModel.emailAddress = this.sellerRegForm.controls['emailAddress'].value;
    this.regModel.password = this.sellerRegForm.controls['password'].value;

    this.authService.signUpSeller(this.regModel).subscribe((res) => {
      this.router.navigate(['/auth/seller']);
      this.notify.success("Member Sign-Up Successfully.");
    },
    (err) => {
      this.notify.error("There is Error Occur " + err);
    });
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
