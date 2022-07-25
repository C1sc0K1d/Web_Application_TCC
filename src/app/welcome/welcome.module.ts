import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignComponent } from "./sign/sign.component";

import { WelcomeComponent } from "./welcome.component";

const routes: Routes = [
	{
		path: '',
		component: WelcomeComponent,
	},
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign',
    component: SignComponent,
  }

];

@NgModule({
  declarations: [
     WelcomeComponent,
     SignComponent,
     LoginComponent
   ],
  imports: [ 
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class WelcomeModule { }