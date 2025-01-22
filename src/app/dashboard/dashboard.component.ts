import { Component, HostBinding, OnInit } from '@angular/core';
import { IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { Locals } from '../utils/interfaces/locals';
import { MqttRequest } from '../utils/services/mqtt-request.component';
import { AuthService } from '../welcome/login/auth.service';
import { DispenserService } from '../utils/services/dispenser.service';
import { Dispenser } from '../utils/interfaces/dispenser.model';

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


  jan_value = '';
  feb_value = '';
  mar_value = '';
  abr_value = '';
  may_value = '';
  jun_value = '';
  jul_value = '';
  ago_value = '';
  sep_value = '';
  oct_value = '';
  nov_value = '';
  dec_value = '';

  @HostBinding("style.--monthsGraf01") monthsGraf01 = '10%';

  @HostBinding("style.--monthsGraf02") monthsGraf02 = '10%';

  @HostBinding("style.--monthsGraf03") monthsGraf03 = '10%';

  @HostBinding("style.--monthsGraf04") monthsGraf04 = '10%';

  @HostBinding("style.--monthsGraf05") monthsGraf05 = '10%';

  @HostBinding("style.--monthsGraf06") monthsGraf06 = '10%';

  @HostBinding("style.--monthsGraf07") monthsGraf07 = '10%';

  @HostBinding("style.--monthsGraf08") monthsGraf08 = '10%';

  @HostBinding("style.--monthsGraf09") monthsGraf09 = '10%';

  @HostBinding("style.--monthsGraf10") monthsGraf10 = '10%';

  @HostBinding("style.--monthsGraf11") monthsGraf11 = '10%';

  @HostBinding("style.--monthsGraf12") monthsGraf12 = '10%';

  constructor(private authService: AuthService, private eventMqtt: MqttRequest, private dispenserService: DispenserService) { }

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

    this.dispenserService.getDispensersAll().forEach(dispenser => {

      this.updateDispensersCaseExists(dispenser);

      this.lowDispensers = 0;
      this.usedTotal = 0;

      this.getTheUsedTotal();

      this.ajustTheGraphs();

    });
  }

  updateDispensersCaseExists(dispenser: Dispenser): void {
    let found = this.dispensers.some(el => el.id === dispenser.id);

    if (found) {
      let index = this.dispensers.findIndex(el => el.id === dispenser.id);
      this.dispensers[index] = dispenser;
    }
    else {
      this.dispensers.push(dispenser);
    }
  }

  getTheUsedTotal(): void {
    this.dispensers.forEach(element => {
      if (element.fluidLevel < 25) {
        this.lowDispensers = this.lowDispensers + 1;
      }
      this.usedTotal = this.usedTotal + element.usedCount;
    });
  }

  ajustTheGraphs(): void {

    let grafOne = {
      local: undefined,
      totalUsed: undefined,
      percent: 0
    };

    let x = 0;

    this.dispensers.forEach(element => {
      if (this.locais.indexOf(element.local) == -1) {
        this.locais.push(element.local);

        grafOne.local = element.local;
        grafOne.totalUsed = element.usedCount;
        grafOne.percent = Math.trunc((100 * grafOne.totalUsed) / (this.usedTotal));

        this.locaisObj.push(grafOne);
        this.locaisObj.sort((a, b) => b.totalUsed - a.totalUsed);
      } else {
        let index = this.locaisObj.findIndex(el => el.local === element.local);
        let result = this.dispensers.filter(value => value.local === element.local);
        x = 0;
        result.forEach(filteredEl => {
          x = x + filteredEl.usedCount;
        });

        this.locaisObj[index].totalUsed = x;
        this.locaisObj[index].percent = Math.round((100 * this.locaisObj[index].totalUsed) / (this.usedTotal));
        this.locaisObj.sort((a, b) => b.totalUsed - a.totalUsed);

        this.gramasAlcool = this.usedTotal * 0.86;
        this.gramasAlcool = parseInt(this.gramasAlcool.toFixed(2));

        this.setMediaColor();

        this.ajustBarGraphPercentage();

      }
    });
  }

  setMediaColor(): void {

    this.mediaSetor = Math.trunc(this.usedTotal / this.locais.length);

    if (this.mediaSetor > 70) {
      this.mediaColor = 'green';
    } else if (this.mediaSetor > 50) {
      this.mediaColor = '#a1a111';
    } else {
      this.mediaColor = 'red';
    }
  }

  ajustBarGraphPercentage(): void {
    this.jan_value = '6442';
    this.feb_value = '5312';
    this.mar_value = '5213';
    this.abr_value = '5345';
    this.may_value = '5347';
    this.jun_value = this.usedTotal.toString();
    this.jul_value = '0';
    this.ago_value = '0';
    this.sep_value = '0';
    this.oct_value = '0';
    this.nov_value = '0';
    this.dec_value = '0';

    let yaerTotal = parseInt(this.jan_value) + parseInt(this.feb_value) + parseInt(this.mar_value) + parseInt(this.abr_value) + parseInt(this.may_value)
      + parseInt(this.jun_value) + parseInt(this.jul_value) + parseInt(this.ago_value) + parseInt(this.sep_value) + parseInt(this.oct_value) + parseInt(this.nov_value)
      + parseInt(this.dec_value);

    this.monthsGraf01 = `${Math.round((100 * +this.jan_value) / yaerTotal)}%`;
    this.monthsGraf02 = `${Math.round((100 * +this.feb_value) / yaerTotal)}%`;
    this.monthsGraf03 = `${Math.round((100 * +this.mar_value) / yaerTotal)}%`;
    this.monthsGraf04 = `${Math.round((100 * +this.abr_value) / yaerTotal)}%`;
    this.monthsGraf05 = `${Math.round((100 * +this.may_value) / yaerTotal)}%`;
    this.monthsGraf06 = `${Math.round((100 * +this.jun_value) / yaerTotal)}%`;
    this.monthsGraf07 = `${Math.round((100 * +this.jul_value) / yaerTotal)}%`;
    this.monthsGraf08 = `${Math.round((100 * +this.ago_value) / yaerTotal)}%`;
    this.monthsGraf09 = `${Math.round((100 * +this.sep_value) / yaerTotal)}%`;
    this.monthsGraf10 = `${Math.round((100 * +this.oct_value) / yaerTotal)}%`;
    this.monthsGraf11 = `${Math.round((100 * +this.nov_value) / yaerTotal)}%`;
    this.monthsGraf12 = `${Math.round((100 * +this.dec_value) / yaerTotal)}%`;

    console.log(this.monthsGraf01);
    console.log(this.monthsGraf02);
    console.log(this.monthsGraf03);
    console.log(this.monthsGraf04);
    console.log(this.monthsGraf05);
    console.log(this.monthsGraf06);
    console.log(this.monthsGraf07);
    console.log(this.monthsGraf08);
    console.log(this.monthsGraf09);
    console.log(this.monthsGraf10);
    console.log(this.monthsGraf11);
    console.log(this.monthsGraf12);

  }

}
