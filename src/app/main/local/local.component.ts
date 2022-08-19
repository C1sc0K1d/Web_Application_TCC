import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/welcome/login/auth.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss']
})
export class LocalComponent implements OnInit {

  percentage = 35;
  color = 'red';
  modalVisible = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.hideBar(false);
  }

   private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  goToMain(): void {
    this.router.navigate(['/main']);
  }

  async showDetails() {
    await this.delay(50)
    this.modalVisible = !this.modalVisible;
  }

  modalToInvisible() {
    if (this.modalVisible == true) {
      this.modalVisible = false;
      console.log('entro');
      
    }
  }

}
