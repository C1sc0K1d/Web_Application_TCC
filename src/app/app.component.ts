import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  public isWelcome = false;
    
  ngOnInit() {
    this.isWelcome = window.location.href.includes("welcome");    
  }
  
}
