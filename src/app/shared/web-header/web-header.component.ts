import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.css']
})
export class WebHeaderComponent implements OnInit {

  menuVariable: boolean = true;
  constructor() { }

  ngOnInit(): void {
    const mobileNavShow = document.querySelector('.mobile-nav-show');
    const mobileNavHide = document.querySelector('.mobile-nav-hide');

    document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
      el.addEventListener('click', function (event) {
        event.preventDefault();
        mobileNavToogle();
      })
    });

    function mobileNavToogle() {
      document.querySelector('body')?.classList.toggle('mobile-nav-active');
      mobileNavShow?.classList.toggle('d-none');
      mobileNavHide?.classList.toggle('d-none');
    }

  }

}
