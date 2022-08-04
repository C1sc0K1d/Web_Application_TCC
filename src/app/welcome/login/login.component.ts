import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public visible = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.hideBar(true);
  }

  logIn(): void {
    this.authService.logIn('3c8923ndc013mevt3tcd324');
  }


}
