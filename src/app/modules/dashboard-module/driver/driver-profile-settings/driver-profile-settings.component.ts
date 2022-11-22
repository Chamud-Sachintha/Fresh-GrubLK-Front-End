import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { MapServiceService } from 'src/app/services/map-service.service';
import { ProfileServiceService } from 'src/app/services/profile-service.service';
import { Profile } from 'src/app/shared/models/Profile';

@Component({
  selector: 'app-driver-profile-settings',
  templateUrl: './driver-profile-settings.component.html',
  styleUrls: ['./driver-profile-settings.component.css']
})
export class DriverProfileSettingsComponent implements OnInit {

  profileDetails = new Profile();
  userId!: any;
  role!: any;
  base64Code!: string;
  lat!: string;
  long!: string;
  profileDetailsForm!: FormGroup;

  constructor(private mapService: MapServiceService, private formBuilder: FormBuilder, private profileService: ProfileServiceService,
    private notify: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem("userId");
    this.createAddProfileDetailsForm();
    this.getExistProfileDetails();
    console.log(sessionStorage.getItem("username"));
    this.profileDetailsForm.controls['emailAddress'].setValue(sessionStorage.getItem("username"));
  }

  getExistProfileDetails() {
    this.role = sessionStorage.getItem("role");

    this.profileService.getProfileDetailsByUserId(this.userId, this.role).subscribe((resp) => {
      if (resp.length !== 0) {
        resp.forEach((el) => {
          this.profileDetailsForm.controls['fullName'].setValue(el.fullName);
          this.profileDetailsForm.controls['mobileNumber'].setValue(el.mobileNumber);
          this.profileDetailsForm.controls['location'].setValue(el.location);
        })
      }
    });
  }

  onSubmitProfileDetailsForm() {
    this.profileDetailsForm.controls['profileImage'].setValue(this.base64Code);

    this.profileDetails.userId = this.userId;
    this.profileDetails.fullName = this.profileDetailsForm.controls['fullName'].value;
    this.profileDetails.emailAddress = this.profileDetailsForm.controls['emailAddress'].value;
    this.profileDetails.mobileNumber = this.profileDetailsForm.controls['mobileNumber'].value;
    this.profileDetails.location = this.profileDetailsForm.controls['location'].value;
    this.profileDetails.profileImage = this.profileDetailsForm.controls['profileImage'].value;
    this.profileDetails.role = sessionStorage.getItem("role");
    this.profileDetails.lat = this.lat;
    this.profileDetails.long = this.long;

    this.profileService.addNewProfileDetails(this.profileDetails).subscribe((resp) => {
      this.notify.success("Profile details Added Successfully.");
      this.route.navigate(['app/driver']).then(() => {
        location.reload();
      })
    }, (err) => {
      this.notify.error("There is an Error Occured.");
    })
  }

  createAddProfileDetailsForm() {
    this.profileDetailsForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      location: ['', Validators.required],
      profileImage: ['', Validators.required]
    });
  }

  openMapDialog() {
    this.mapService.openMapDialog().afterClosed().subscribe((resp) => {
      if (resp) {
        this.profileDetailsForm.controls['location'].setValue(resp.address);
        this.lat = resp.marker.latitude;
        this.long = resp.marker.longitude;
      }
    })
  }

  onChangeImage = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.convertToBase64Code(file);
  }

  convertToBase64Code(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((d) => {
      console.log(d);
      this.base64Code = d;
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      subscriber.next(fileReader.result);

      subscriber.complete();
    }

    fileReader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    }
  }

}
