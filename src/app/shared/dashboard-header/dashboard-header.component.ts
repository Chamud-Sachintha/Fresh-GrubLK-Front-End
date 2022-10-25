import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  menuItems = [{title: '',path: '', class: ''}];
  isSellerDashboardView!: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.menuCollapse();
    this.loadMainMenuItems();
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
          path: '/add-customer',
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
          path: '/add-seller',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Sign Out',
          path: '/add-seller',
          class: 'fa fa-home mr-3'
        }
      ];
    }
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
