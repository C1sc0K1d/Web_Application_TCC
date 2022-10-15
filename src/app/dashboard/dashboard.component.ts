import { Component, OnInit } from '@angular/core';
import { IMqttMessage } from 'ngx-mqtt';
import { async, first, Subscription } from 'rxjs';
import { Locals } from '../utils/interfaces/locals';
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
  percent_four = 19;
  percent_five = 21;

  grafOne: Locals = {
    local: undefined,
    totalUsed: undefined,
    percent: undefined
  };
  
  filter = false;
  dispensers: any[] = [];

  lowDispensers = 0;
  usedTotal = 0;

  locaisObj: Locals[];
  locais = []

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
    let index = 0;
    this.subscription = this.eventMqtt.topic('')
        .subscribe((data: IMqttMessage) => {

            let local =  data.topic.split("/")[2];

            let item = JSON.parse(data.payload.toString());

            let found = this.dispensers.some(el => el.id === item.id);

            item.local = local;

            if (found) {
              let index = this.dispensers.findIndex(el => el.id === item.id);
              this.dispensers[index] = item;
            }
            else {
              this.dispensers.push(item); 
            }
            this.lowDispensers = 0;
            this.usedTotal = 0;
            this.dispensers.forEach(async element => {
              if (element.fluidLevel < 25) {
                this.lowDispensers = this.lowDispensers + 1;
              }
              this.usedTotal = this.usedTotal + element.usedCount;

              if (this.locais.indexOf(item.local) == -1) {
                this.locais.push(item.local);
  
                this.locaisObj[index].local  = item.local;
                this.locaisObj[index].totalUsed = item.usedCount;
                this.locaisObj[index].percent = ((100* this.grafOne.totalUsed)/this.usedTotal);
                console.log(this.grafOne);

                index++;
                console.log(this.locaisObj);
              } else {
                //let index = this.locaisObj.findIndex(el => el.local === item.local);
                //this.locaisObj[index].totalUsed = this.locaisObj[index].totalUsed + item.usedCount;
                //this.locaisObj[index].percent = ((100*this.grafOne.totalUsed)/this.usedTotal);
                //console.log(this.locais);
              }
            });

            

            //console.log(this.dispensers);            
        });
  }

}
