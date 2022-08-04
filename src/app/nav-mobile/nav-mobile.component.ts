import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrls: ['./nav-mobile.component.scss']
})
export class NavMobileComponent implements OnInit {

  constructor() { }

  showNavbar = false;

  ngOnInit() {
  }

  showHideNavbar(): void {
    this.showNavbar = !this.showNavbar;
    console.log(this.showNavbar);
  }

}
