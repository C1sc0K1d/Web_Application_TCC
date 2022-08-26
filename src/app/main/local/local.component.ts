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
  dispensers: any[] = [
    {
      percentage: 65,
      color: 'green',
      signal: false
    },
    {
      percentage: 42,
      color: 'yellow',
      signal: false
    },
    {
      percentage: 13,
      color: 'red',
      signal: false
    }
  ]

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

  showDetails(index: number): void {
    this.dispensers[index].signal = !this.dispensers[index].signal;
  }

  modalToInvisible() {
    if (this.modalVisible == true) {
      this.modalVisible = false;
      console.log('entro');
      
    }
  }

}
