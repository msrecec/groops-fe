import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./component/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {
  BASE,
  CONFIRM_EMAIL,
  CONFIRM_PASSWORD, EMAIL_CHANGE, EMAIL_CREATE,
  HOME,
  LOGIN, PASSWORD_CHANGE,
  PROFILE,
  PROFILE_EDIT,
  REGISTER
} from "./constants/app.constants";
import {HomeComponent} from "./component/home/home.component";
import {BaseComponent} from "./component/base/base.component";
import {RegisterComponent} from "./component/register/register.component";
import {ConfirmEmailComponent} from "./component/confirm-email/confirm-email.component";
import {ConfirmPasswordComponent} from "./component/confirm-password/confirm-password.component";
import {ProfileComponent} from "./component/profile/profile.component";
import {ProfileEditComponent} from "./component/profile-edit/profile-edit.component";
import {
  EmailChangeConfirmationComponent
} from "./component/confirmation/email-change-confirmation/email-change-confirmation.component";
import {
  EmailCreateConfirmationComponent
} from "./component/confirmation/email-create-confirmation/email-create-confirmation.component";
import {
  PasswordChangeConfirmationComponent
} from "./component/confirmation/password-change-confirmation/password-change-confirmation.component";



const routes: Routes = [
  { path: BASE, component: BaseComponent},
  { path: LOGIN, component: LoginComponent},
  { path: REGISTER, component: RegisterComponent},
  { path: HOME, component: HomeComponent},
  { path: CONFIRM_EMAIL, component: ConfirmEmailComponent},
  { path: CONFIRM_PASSWORD, component: ConfirmPasswordComponent},
  { path: PROFILE, component: ProfileComponent},
  { path: PROFILE_EDIT, component: ProfileEditComponent},
  { path: EMAIL_CHANGE, component: EmailChangeConfirmationComponent},
  { path: EMAIL_CREATE, component: EmailCreateConfirmationComponent},
  { path: PASSWORD_CHANGE, component: PasswordChangeConfirmationComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
