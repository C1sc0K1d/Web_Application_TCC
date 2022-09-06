import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrls: ['./nav-mobile.component.scss']
})
export class NavMobileComponent implements OnInit {

  constructor(private router: Router) { }

  showNavbar = false;

  ngOnInit() : void {}

  showHideNavbar(): void {
    this.showNavbar = !this.showNavbar;
    console.log(this.showNavbar);
  }

  goToMain(): void {
    this.router.navigate(['/main']);
    this.showNavbar = !this.showNavbar;
  }
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
    this.showNavbar = !this.showNavbar;
  }

}
