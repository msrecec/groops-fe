import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./component/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {HOME, LOGIN} from "./constants/app.constants";
import {HomeComponent} from "./component/home/home.component";



const routes: Routes = [
  { path: '', redirectTo: HOME, pathMatch: 'full' },
  { path: HOME, component: HomeComponent},
  { path: LOGIN, component: LoginComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
