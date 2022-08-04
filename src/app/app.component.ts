import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './welcome/login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  public isWelcomePage = true;

  constructor(private router: Router, private authService: AuthService) {}
    
  ngOnInit() {
    this.authService.showNavbaEmitter.subscribe(show => this.isWelcomePage = show);
  }

  toStartPage() : void {
    this.router.navigate(['/welcome']);
  }
  
}
