import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { MessageService } from "src/message.service";

@Injectable({
  providedIn: 'root'
})
export class Requests {
  url = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) {}
}
