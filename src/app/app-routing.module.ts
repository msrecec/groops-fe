import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./component/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {BASE, HOME, LOGIN, REGISTER} from "./constants/app.constants";
import {HomeComponent} from "./component/home/home.component";
import {BaseComponent} from "./component/base/base.component";
import {RegisterComponent} from "./component/register/register.component";



const routes: Routes = [
  { path: BASE, component: BaseComponent},
  { path: LOGIN, component: LoginComponent},
  { path: REGISTER, component: RegisterComponent},
  { path: HOME, component: HomeComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
