import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-customer-dashboard-header',
  templateUrl: './customer-dashboard-header.component.html',
  styleUrls: ['./customer-dashboard-header.component.css']
})
export class CustomerDashboardHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
