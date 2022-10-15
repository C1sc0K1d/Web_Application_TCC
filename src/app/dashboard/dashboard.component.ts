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

  filter = false;
  dispensers: any[] = [];

  lowDispensers = 0;
  usedTotal = 0;

  locaisObj: Locals[] = [];
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
            let grafOne = {
              local: undefined,
              totalUsed: undefined,
              percent: 0
            };
            let x = 0;
            console.log("start");           
            this.dispensers.forEach(element => {
              if (element.fluidLevel < 25) {
                this.lowDispensers = this.lowDispensers + 1;
              }
              this.usedTotal = this.usedTotal + element.usedCount;
            });
            this.dispensers.forEach(element => {
              if (this.locais.indexOf(element.local) == -1) {
                this.locais.push(element.local);

                grafOne.local  = element.local;
                grafOne.totalUsed = element.usedCount;
                grafOne.percent = Math.trunc((100 * grafOne.totalUsed)/(this.usedTotal));

                this.locaisObj.push(grafOne);
                this.locaisObj.sort((a,b) => b.totalUsed - a.totalUsed);
              } else {
                let index = this.locaisObj.findIndex(el => el.local === element.local);
                let result = this.dispensers.filter(value => value.local === element.local);
                x = 0;
                result.forEach(filteredEl => {
                  x = x + filteredEl.usedCount;
                });
                
                this.locaisObj[index].totalUsed = x;
                this.locaisObj[index].percent = Math.trunc((100 *  this.locaisObj[index].totalUsed)/(this.usedTotal));
                this.locaisObj.sort((a,b) => b.totalUsed - a.totalUsed);
              }
            });         
        });
  }

}
