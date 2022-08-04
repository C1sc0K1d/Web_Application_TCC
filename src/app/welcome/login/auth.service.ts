import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  showNavbaEmitter = new EventEmitter<boolean>();

  private userAuthorized = false;

  constructor(private router: Router) { }

  logIn(token: string) : void {

    if(token === '3c8923ndc013mevt3tcd324'){
      console.log('entro');
    

      this.userAuthorized = true
      this.showNavbaEmitter.emit(false);

      this.router.navigate(['/main']);
    } else {
      
      console.log('entro');
      this.userAuthorized = false
      this.showNavbaEmitter.emit(true);
    }
  }

  hideBar(hide: boolean) : void {
    this.showNavbaEmitter.emit(hide);
  }

  userAuthenticaded() : boolean {
    return this.userAuthorized;
  }

}
