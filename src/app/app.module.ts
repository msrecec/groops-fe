import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './component/login/login.component';
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from './component/home/home.component';
import {BaseComponent} from './component/base/base.component';
import {RegisterComponent} from './component/register/register.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConfirmEmailComponent } from './component/confirm-email/confirm-email.component';
import { ConfirmPasswordComponent } from './component/confirm-password/confirm-password.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ProfileEditComponent } from './component/profile-edit/profile-edit.component';
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {NgOptimizedImage} from "@angular/common";
import { SpinningComponent } from './component/spinning/spinning.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BaseComponent,
    RegisterComponent,
    ConfirmEmailComponent,
    ConfirmPasswordComponent,
    NavigationComponent,
    ProfileComponent,
    ProfileEditComponent,
    SpinningComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterOutlet,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NgOptimizedImage
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
