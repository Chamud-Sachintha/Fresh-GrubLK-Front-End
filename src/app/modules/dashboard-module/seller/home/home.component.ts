import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileServiceService } from 'src/app/services/profile-service.service';
import { Profile } from 'src/app/shared/models/Profile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profileDetails = new Profile();
  userId!: any;
  userRole!: any;

  constructor(private profileService: ProfileServiceService,private router: Router) { }

  ngOnInit(): void {
    this.checkIfExistProfileDetails();
  }

  checkIfExistProfileDetails() {
    this.userId = sessionStorage.getItem("userId");
    this.userRole = sessionStorage.getItem("role");

    this.profileService.getProfileDetailsByUserId(this.userId, this.userRole).subscribe((resp) => {
      if (resp.length !== 0) {
        resp.forEach((el) => {
          this.profileDetails.fullName = el.fullName
        })
      } else {
        this.router.navigate(['/app/seller/profile']);
      }
    });
  }

}
