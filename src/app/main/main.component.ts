import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../welcome/login/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  percentage = 25;
  color = 'red'

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.authService.hideBar(true);
  }

  ngOnInit(): void {
    this.authService.hideBar(false);
  }

  goToLocal(id: number): void {
    this.router.navigate(['/main/local/' + id]);
  }

}
