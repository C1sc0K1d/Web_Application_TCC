import { Component, OnInit } from '@angular/core';
import { IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { MqttRequest } from '../utils/services/mqtt-request.component';
import { AuthService } from '../welcome/login/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  percent_one = 53;
  percent_two = 30;
  percent_tree = 17;
  filter = false;
  dispensers: any[] = [];

  subscription: Subscription;

  constructor(private authService: AuthService, private eventMqtt: MqttRequest) { }

  ngOnInit() {
    this.authService.hideBar(false);
    this.subscribeToTopic();
  }

  openFilter(): void {
    this.filter = !this.filter
  }

  ngOnDestroy(): void {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

  private subscribeToTopic() {    
      this.subscription = this.eventMqtt.topic('')
          .subscribe((data: IMqttMessage) => {

              let item = JSON.parse(data.payload.toString());

              let found = this.dispensers.some(el => el.id === item.id);

              if (item.fluidLevel < 70) {
                item.color = 'green';
              } 

              if (found) {
                let index = this.dispensers.findIndex(el => el.id === item.id);
                this.dispensers[index] = item;  
              }
              else {
                this.dispensers.push(item);
              }        
          });
          console.log(this.dispensers);
          
  }

}
