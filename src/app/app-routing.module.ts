import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./component/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {
  ACCOUNT_DELETE_CONFIRM,
  ACCOUNT_EDIT,
  BASE,
  CONFIRM_EMAIL,
  CONFIRM_PASSWORD,
  EMAIL_CHANGE,
  EMAIL_CREATE,
  GROUP,
  GROUP_CREATE,
  GROUP_DELETE,
  GROUP_EDIT,
  GROUP_LEAVE,
  GROUP_POSTS,
  GROUPS,
  HOME,
  LOGIN,
  PASSWORD_CHANGE,
  PASSWORD_FORGOT,
  PASSWORD_FORGOT_CHANGE,
  PASSWORD_FORGOT_USER, POST_CREATE,
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
import {
  PasswordForgotConfirmationComponent
} from "./component/confirmation/password-forgot-confirmation/password-forgot-confirmation.component";
import {
  PasswordForgotChangeComponent
} from "./component/confirmation/password-forgot-change/password-forgot-change.component";
import {AccountEditComponent} from "./component/account-edit/account-edit.component";
import {GroupListComponentComponent} from "./component/group/group-list-component/group-list-component.component";
import {GroupCreateComponent} from "./component/group/group-create/group-create.component";
import {GroupComponent} from "./component/group/group/group.component";
import {PasswordForgotComponent} from "./component/confirmation/password-forgot/password-forgot.component";
import {GroupEditComponent} from "./component/group/group-edit/group-edit.component";
import {GroupDeleteComponent} from "./component/group/group-delete/group-delete.component";
import {GroupLeaveComponent} from "./component/group/group-leave/group-leave.component";
import {AccountEditDeleteComponent} from "./component/account-edit-delete/account-edit-delete.component";
import {PostsComponent} from "./component/posts/posts.component";
import {PostCreateComponent} from "./component/post-create/post-create.component";



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
  { path: PASSWORD_CHANGE, component: PasswordChangeConfirmationComponent},
  { path: PASSWORD_FORGOT, component: PasswordForgotConfirmationComponent},
  { path: PASSWORD_FORGOT_CHANGE, component: PasswordForgotChangeComponent},
  { path: PASSWORD_FORGOT_USER, component: PasswordForgotComponent},
  { path: ACCOUNT_EDIT, component: AccountEditComponent},
  { path: GROUP, component: GroupComponent},
  { path: GROUP_EDIT, component: GroupEditComponent},
  { path: GROUPS, component: GroupListComponentComponent},
  { path: GROUP_CREATE, component: GroupCreateComponent},
  { path: GROUP_DELETE, component: GroupDeleteComponent},
  { path: GROUP_LEAVE, component: GroupLeaveComponent},
  { path: ACCOUNT_DELETE_CONFIRM, component: AccountEditDeleteComponent},
  { path: GROUP_POSTS, component: PostsComponent},
  { path: POST_CREATE, component: PostCreateComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
