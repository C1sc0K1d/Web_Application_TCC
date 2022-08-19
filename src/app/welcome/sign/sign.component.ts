import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() : void {
    this.authService.hideBar(true);
  }

  sign(): void {
    this.router.navigate(['/welcome']);
  }

}
