import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
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
  dispensers: any[] = [];
  signals = [];

  subscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private eventMqtt: MqttRequest) { }

  ngOnInit(): void {
    this.authService.hideBar(false);
    this.chooseTopic(this.router.url.slice(-1))
    this.subscribeToTopic();
    this.chooseLocal(this.router.url.slice(-1));
  }

   private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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
      this.subscription = this.eventMqtt.topic(this.topic)
          .subscribe((data: IMqttMessage) => {

              let local =  data.topic;
              console.log(local);
              

              if (this.locais.indexOf(local) == -1) {
                //this.locais.push(local);
              }

              let item = JSON.parse(data.payload.toString());

              let found = this.dispensers.some(el => el.id === item.id);

              if (item.fluidLevel > 70) {
                item.color = 'green';
              } else if (item.fluidLevel < 70 && item.fluidLevel > 40) {
                item.color = 'yellow';
              } else {
                item.color = 'red';
              }

              if (found) {
                let index = this.dispensers.findIndex(el => el.id === item.id);
                this.dispensers[index] = item;  
              }
              else {
                this.dispensers.push(item);
                this.signals.push(false);
              }            
          });
  }
}        
