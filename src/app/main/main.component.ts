import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { MqttRequest } from '../utils/services/mqtt-request.component';
import { AuthService } from '../welcome/login/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private eventMqtt: MqttRequest) { }

  percentage = 25;
  color = 'red'
  subscription: Subscription;
  locais = ['Administração', 'Centro Cirúrgico', 'Pediatria', 'Enfermaria', 'UTI'];

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.authService.hideBar(true);
  }

  ngOnInit(): void {
    this.authService.hideBar(false);
    this.subscribeToTopic();
  }

  goToLocal(id: number): void {
    this.router.navigate(['/main/local/' + id]);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

  private subscribeToTopic() {
    console.log("test");
    
      this.subscription = this.eventMqtt.topic('')
          .subscribe((data: IMqttMessage) => {
            let local =  data.topic.split("/")[2];
            if (this.locais.indexOf(local) == -1) {
              //this.locais.push(local);
            }
          });
  }

}
