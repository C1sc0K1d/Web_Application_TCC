import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { InformationsModalComponent } from "./informations-modal/informations-modal.component";
import { LocalComponent } from "./local/local.component";
import { MainComponent } from "./main.component";
const routes: Routes = [
	{
		path: '',
		component: MainComponent,
	},
  {
    path: 'local/:id',
    component: LocalComponent,
  }
];

@NgModule({
  declarations: [
     MainComponent,
     LocalComponent,
     InformationsModalComponent
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
export class MainModule { }