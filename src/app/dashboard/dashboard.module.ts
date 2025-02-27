import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
	},
];

@NgModule({
  declarations: [
			DashboardComponent
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
export class DashboardModule { }