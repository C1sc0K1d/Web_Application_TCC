import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private router: Router) { }
  
  pages = ['main', 'dashboard'];
  page: string;

  ngOnInit() : void {
    this.checkPage();
  }

  goToMain(): void {
    this.page = 'main'
    this.router.navigate(['/main']);
  }
  goToDashboard(): void {
    this.page = 'dashboard'
    this.router.navigate(['/dashboard']);
  }

  checkPage() : void {
    this.pages.some(element => {
      if (window.location.href.includes(element)) {
        this.page = element;
      }
    });
  }

}
