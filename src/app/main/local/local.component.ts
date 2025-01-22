import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { Dispenser } from 'src/app/utils/interfaces/dispenser.model';
import { DispenserService } from 'src/app/utils/services/dispenser.service';
import { MqttRequest } from 'src/app/utils/services/mqtt-request.component';
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
  locais = ['Administração', 'Centro Cirúrgico', 'Pediatria', 'Enfermaria', 'UTI'];
  topics = ['/1_Andar/Administracao', '/1_Andar/Centro_Cirurgico', '/1_Andar/Pediatria', '/Terreo/Enfermaria', '/Terreo/UTI'];
  local = '';
  topic = '';
  dispensers: Dispenser[] = [];
  signals = [];

  subscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private eventMqtt: MqttRequest, private dispenserService: DispenserService) { }

  ngOnInit(): void {
    this.authService.hideBar(false);
    this.chooseTopic(this.router.url.slice(-1))
    this.chooseLocal(this.router.url.slice(-1));
    this.subscribeToTopic();
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  goToMain(): void {
    this.router.navigate(['/main']);
  }

  showDetails(index: number): void {
    this.signals[index] = !this.signals[index];
  }

  modalToInvisible() {
    if (this.modalVisible == true) {
      this.modalVisible = false;
    }
  }

  chooseLocal(local: string): void {
    this.local = this.locais[parseInt(local) - 1];
  }

  chooseTopic(topic: string): void {
    this.topic = this.topics[parseInt(topic) - 1]
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private subscribeToTopic() {
    switch (this.local) {
      case 'Administração':
        this.dispensers = this.dispenserService.getDispensersAdm();
        break;
      case 'Centro Cirúrgico':
        this.dispensers = this.dispenserService.getDispensersCentroCirugico();
        break;

      case 'Pediatria':
        this.dispensers = this.dispenserService.getDispensersPediatria();
        break;

      case 'Enfermaria':
        this.dispensers = this.dispenserService.getDispensersEnfermaria();
        break;

      case 'UTI':
        this.dispensers = this.dispenserService.getDispensersUTI();
        break;

      default:
        break;
    }
  }
}        
