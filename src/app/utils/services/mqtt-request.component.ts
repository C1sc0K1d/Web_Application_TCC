import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MqttRequest {
  url = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' })
  };

  private endpoint: string;

	constructor( private _mqttService: MqttService) { this.endpoint = 'dabliuci-startuptop10'; }

  topic(topic: string): Observable<IMqttMessage> {
    let topicName = `${this.endpoint}${topic}/#`;
    return this._mqttService.observe(topicName);
  }
}