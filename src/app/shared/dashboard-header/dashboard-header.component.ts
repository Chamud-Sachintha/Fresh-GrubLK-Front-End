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
          title: 'Home',
          path: '/customer',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'View Wishlist',
          path: '/view-wishlist',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Add Customer',
          path: '/add-customer',
          class: 'fa fa-home mr-3'
        }
      ];
    } else if (this.router.url.includes('seller')) {
      this.menuItems = [
        {
          title: 'Home',
          path: '/seller',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'View Wishlist',
          path: '/view-wishlist',
          class: 'fa fa-home mr-3'
        },
        {
          title: 'Add Seller',
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
