import { Component, HostBinding, OnInit } from '@angular/core';
import { IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { Locals } from '../utils/interfaces/locals';
import { MqttRequest } from '../utils/services/mqtt-request.component';
import { AuthService } from '../welcome/login/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  filter = false;
  dispensers: any[] = [];

  mediaSetor = 0;

  lowDispensers = 0;
  usedTotal = 0;

  locaisObj: Locals[] = [];
  locais = []

  subscription: Subscription;

  mediaColor = 'red';
  gramasAlcool = 0;

  oct_value = '';
  @HostBinding("style.--monthsGraf10") monthsGraf10 = '10%';

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
            this.dispensers.forEach(element => {
              if (element.fluidLevel < 25) {
                this.lowDispensers = this.lowDispensers + 1;
              }
              this.usedTotal = this.usedTotal + element.usedCount;
            });
            this.dispensers.forEach(element => {
              if (this.locais.indexOf(element.local) == -1) {
                this.locais.push(element.local);

                grafOne.local = element.local;
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

                this.mediaSetor = Math.trunc(this.usedTotal/this.locais.length);
                if (this.mediaSetor > 70) {
                  this.mediaColor = 'green';
                } else if (this.mediaSetor > 50) {
                  this.mediaColor = '#a1a111';
                } else {
                  this.mediaColor = 'red';
                }

                this.gramasAlcool = this.usedTotal * 0.86;
                this.gramasAlcool = parseInt(this.gramasAlcool.toFixed(2));
                this.oct_value = this.usedTotal.toString();

                console.log(this.oct_value);
                
                this.monthsGraf10 = `${(this.usedTotal)/5}%`;
              }
            });         
        });
  }

}
