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
  locais = ["Pronto Socorro", "UTI Adulto", "Pediatria"];
  local = '';
  dispensers: any[] = [
    {
      percentage: 65,
      color: 'darkgreen',
      signal: false,
      dispenser: "Corredor norte"
    },
    {
      percentage: 42,
      color: '#a1a111',
      signal: false,
      dispenser: "Corredor sul"
    },
    {
      percentage: 13,
      color: 'darkred',
      signal: false,
      dispenser: "Saida banheiro"
    }
  ]

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.hideBar(false);
    this.chooseLocal(this.router.url.slice(-1));
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
    }
  }

  chooseLocal(local: string): void {
    this.local = this.locais[parseInt(local) - 1];
  }

}
