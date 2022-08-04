import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../welcome/login/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService) { }

  percentage = 25;
  color = 'red'

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.authService.hideBar(true);
  }

  ngOnInit() {
    this.authService.hideBar(false);
  }

}
