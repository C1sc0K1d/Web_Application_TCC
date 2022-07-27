import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  public isWelcome = false;

  constructor(private router: Router) {}
    
  ngOnInit() {
    this.isWelcome = window.location.href.includes("welcome");    
  }

  toStartPage() : void {
    this.router.navigate(['/welcome']);
  }
  
}
