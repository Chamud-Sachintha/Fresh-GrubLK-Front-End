import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ProfileServiceService } from 'src/app/services/profile-service.service';
import { Profile } from '../models/Profile';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  menuItems = [{title: '',path: '', class: ''}];
  profileDetails = new Profile();
  userId!: any;
  userRole!: any;
  isSellerDashboardView!: boolean;

  constructor(private router: Router, private profileService: ProfileServiceService) { }

  ngOnInit(): void {
    this.menuCollapse();
    this.loadMainMenuItems();
    this.getProfileDetails();
  }

  loadMainMenuItems() {
    if (this.router.url.includes('customer')) {
      this.menuItems = [
        {
          title: 'Dashboard',
          path: '/app/customer',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'See Menu (s) & Buy',
          path: '/app/customer/buy',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'My Cart',
          path: '/app/customer/cart',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'My Orders',
          path: '/app/customer/orders',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Add Coupons',
          path: '/add-customer',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Profile Settings',
          path: '/app/customer/profile',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Sign Out',
          path: '/add-customer',
          class: 'fa fa-home mr-3'
        }
      ];
    } else if (this.router.url.includes('seller')) {
      this.menuItems = [
        {
          title: 'Dashboard',
          path: '/app/seller',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Add Reatuarants & Manage',
          path: '/app/seller/add-restuarant',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Add Category',
          path: '/app/seller/add-category',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Add Eatables',
          path: '/app/seller/add-eatables',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Order Requests',
          path: '/app/seller/order-requests',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Add Offer & Manage',
          path: '/add-seller',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Profile Settings',
          path: '/app/seller/profile',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Sign Out',
          path: '/add-seller',
          class: 'fa fa-home mr-3'
        }
      ];
    } else if (this.router.url.includes('driver')) {
      this.menuItems = [
        {
          title: 'Dashboard',
          path: '/app/driver',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Available Deliveries',
          path: '/app/driver/available-deliveries',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Completed Jobs',
          path: '/app/driver/completed',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Ratings',
          path: '#',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Profile Settings',
          path: '/app/driver/profile',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Sign-Out',
          path: '/app/driver',
          class: 'fa fa-home mr-3'
        }
      ];
    } else if (this.router.url.includes('admin')) {
      this.menuItems = [
        {
          title: 'Dashboard',
          path: '/app/admin',
          class: 'fa fa-home mr-3'
        },
      ]
    }
  }

  getProfileDetails() {
    this.userId = sessionStorage.getItem("userId");
    this.userRole = sessionStorage.getItem("role");

    this.profileService.getProfileDetailsByUserId(this.userId, this.userRole).subscribe((resp) => {
      resp.forEach((el) => {
        this.profileDetails.fullName = el.fullName
        sessionStorage.setItem("lat", el.lat);
        sessionStorage.setItem("long", el.long);
      })
    })
  }

  menuCollapse() {
    "use strict";

    var fullHeight = function () {

      $('.js-fullheight').css('height', Number($(window).height()));
      $(window).resize(function () {
        $('.js-fullheight').css('height', Number($(window).height()));
      });

    };
    fullHeight();

    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
  }

}
