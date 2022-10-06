import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NavMobileComponent } from './nav-mobile/nav-mobile.component';
import { AuthService } from './welcome/login/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";
import { environment as env } from '../environments/environment';

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: env.mqtt.server,
    port: env.mqtt.port,
    protocol: (env.mqtt.protocol === "wss") ? "wss" : "ws",
    path: '',
};

@NgModule({
  declarations: [					
    AppComponent,
    NavComponent,
    NavMobileComponent,
    NotFoundComponent
   ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy }, AuthService, AuthGuard],
  bootstrap: [AppComponent]
}) export class AppModule {}