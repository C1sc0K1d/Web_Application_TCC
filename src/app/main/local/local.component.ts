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
  locais = ["Pronto Socorro", "UTI Adulto", "Pediatria"];
  local = '';
  dispensers: any[] = []

  private deviceId: string;
  subscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private eventMqtt: MqttRequest) { }

  ngOnInit(): void {
    this.authService.hideBar(false);
    this.chooseLocal(this.router.url.slice(-1));
    this.subscribeToTopic();
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

  ngOnDestroy(): void {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

  private subscribeToTopic() {
    console.log("test");
    
      this.subscription = this.eventMqtt.topic(this.deviceId)
          .subscribe((data: IMqttMessage) => {
              let item = JSON.parse(data.payload.toString());

              const { length } = this.dispensers;
              let found = this.dispensers.some(el => el.id === item.id);
              console.log(found);

              if (item.fluidLevel > 70) {
                item.color = 'green';
              } else if (item.fluidLevel < 70 && item.fluidLevel > 40) {
                item.color = 'yellow';
              } else {
                item.color = 'red';
              }
              item.signal = false;

              if (found) {
                let index = this.dispensers.findIndex(el => el.id === item.id);
                this.dispensers[index] = item;
              }
              else {
                this.dispensers.push(item);
              }
              
              //console.log(item);
              //console.log(this.dispensers);              
          });
        console.log(this.dispensers); 
  }
}        
