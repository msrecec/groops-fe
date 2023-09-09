import { Component } from '@angular/core';
import {AuthService} from "../../../service/auth/auth.service";
import {Router} from "@angular/router";
import {catchError, tap, throwError} from "rxjs";
import {Error} from "../../../model/error.model";
import {CONFIRM_EMAIL, CONFIRM_PASSWORD} from "../../../constants/app.constants";
import {transitionAnimation} from "../../../animation/transition.animation";
import {UserService} from "../../../service/user/user.service";

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css'],
  animations: [transitionAnimation]
})
export class PasswordForgotComponent {
  errorToggle: Boolean = false
  errorMessage: String = "Something went wrong"
  username = '';
  password = '';
  usernameRequiredError = '';
  passwordRequiredError = '';

  constructor(private userService: UserService, private router: Router) {
  }

  forgotPassword() {
    console.log('Sending login')
    this.errorMessage = ''
    this.usernameRequiredError = ''
    this.passwordRequiredError = ''
    this.userService.forgotPassword(this.username).pipe(
        catchError(err => this.showErrorMessage(err)),
        tap(
            () => {
              console.log(`Successfully logged in with date`)
              this.router.navigate([`/${CONFIRM_PASSWORD}`]).then(() => console.log(`Navigating to ${CONFIRM_PASSWORD} page`));
            }
        )
    ).subscribe();
  }

  private showErrorMessage(errorRes: Error) {
    let errorMessage = 'An unknown error occurred';

    if (errorRes != null && errorRes.status != null) {
      if (errorRes.status === 401 || errorRes.status === 403 || errorRes.status === 400) {
        this.errorToggle = true
      }
      if (errorRes.message != null) {
        const msgSplit = errorRes.message.split(';')
        for (let msgNonTrimmed of msgSplit) {
          const msg = msgNonTrimmed.trim()
          if (msg === 'username is required') {
            this.usernameRequiredError = 'username is required'
            continue
          }
          if (msg === 'password is required') {
            this.passwordRequiredError = 'password is required'
            continue
          }
          if (msg === 'You must verify email') {
            this.router.navigate([`/${CONFIRM_EMAIL}`]).then(() => console.log(`Navigating to ${CONFIRM_EMAIL} page`));
            return throwError(() => errorMessage);
          }
          if (msg === 'You must verify password') {
            this.router.navigate([`/${CONFIRM_PASSWORD}`]).then(() => console.log(`Navigating to ${CONFIRM_PASSWORD} page`));
            return throwError(() => errorMessage);
          }
          this.errorMessage = msg
        }
        return throwError(() => new Error(false, errorRes.message, errorRes.status))
      }
    }
    return throwError(() => errorMessage);
  }
}
