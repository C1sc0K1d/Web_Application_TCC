import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() : void {
    this.authService.hideBar(true);
  }

  gotoLogin() : void {
    this.router.navigate(['/welcome/login']);
  }

  gotoSing() : void {
    this.router.navigate(['/welcome/sign']);
  }

}
