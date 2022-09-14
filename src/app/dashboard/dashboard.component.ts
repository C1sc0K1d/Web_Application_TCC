import { Component, OnInit } from '@angular/core';
import { AuthService } from '../welcome/login/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  percent_one = 53;
  percent_two = 22;
  percent_tree = 25;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.hideBar(false);
  }

}
