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

  pages = ['main', 'dashboard'];
  page: string;

  ngOnInit() : void {
    this.checkPage();
  }

  showHideNavbar(): void {
    this.showNavbar = !this.showNavbar;
    console.log(this.showNavbar);
  }

  goToMain(): void {
    this.router.navigate(['/main']);
    this.showNavbar = !this.showNavbar;
    this.page = 'main'
  }
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
    this.showNavbar = !this.showNavbar;
    this.page = 'dashboard'
  }

  checkPage() : void {
    this.pages.some(element => {
      if (window.location.href.includes(element)) {
        this.page = element;
      }
    });
  }

}
