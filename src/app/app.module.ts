import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './component/login/login.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
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
import { EmailCreateConfirmationComponent } from './component/confirmation/email-create-confirmation/email-create-confirmation.component';
import { EmailChangeConfirmationComponent } from './component/confirmation/email-change-confirmation/email-change-confirmation.component';
import { PasswordChangeConfirmationComponent } from './component/confirmation/password-change-confirmation/password-change-confirmation.component';
import { PasswordForgotConfirmationComponent } from './component/confirmation/password-forgot-confirmation/password-forgot-confirmation.component';
import { PasswordForgotChangeComponent } from './component/confirmation/password-forgot-change/password-forgot-change.component';
import { AccountEditComponent } from './component/account-edit/account-edit/account-edit.component';
import { GroupListComponentComponent } from './component/group/group-list-component/group-list-component.component';
import { GroupCreateComponent } from './component/group/group-create/group-create.component';
import { GroupComponent } from './component/group/group/group.component';
import { PasswordForgotComponent } from './component/confirmation/password-forgot/password-forgot.component';
import { GroupEditComponent } from './component/group/group-edit/group-edit.component';
import { GroupDeleteComponent } from './component/group/group-delete/group-delete.component';

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
    EmailCreateConfirmationComponent,
    EmailChangeConfirmationComponent,
    PasswordChangeConfirmationComponent,
    PasswordForgotConfirmationComponent,
    PasswordForgotChangeComponent,
    AccountEditComponent,
    GroupListComponentComponent,
    GroupCreateComponent,
    GroupComponent,
    PasswordForgotComponent,
    GroupEditComponent,
    GroupDeleteComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterOutlet,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NgOptimizedImage,
        RouterLinkActive,
        RouterLink
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
