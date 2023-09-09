import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {catchError, tap, throwError} from "rxjs";
import {Error} from "../../model/error.model";
import {CONFIRM_EMAIL, CONFIRM_PASSWORD, PASSWORD_FORGOT_USER, REGISTER} from "../../constants/app.constants";
import {Router} from "@angular/router";
import {transitionAnimation} from "../../animation/transition.animation";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    animations: [transitionAnimation]
})
export class LoginComponent {
    errorToggle: Boolean = false
    errorMessage: String = "Something went wrong"
    username = '';
    password = '';
    usernameRequiredError = '';
    passwordRequiredError = '';

    constructor(private authService: AuthService, private router: Router) {
    }

    login() {
        console.log('Sending login')
        this.errorMessage = ''
        this.usernameRequiredError = ''
        this.passwordRequiredError = ''
        this.authService.login(this.username, this.password).pipe(
            catchError(err => this.showErrorMessage(err)),
            tap(
                (value) => {
                    console.log(`Successfully logged in with date`)
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

    protected readonly PASSWORD_FORGOT_USER = PASSWORD_FORGOT_USER;
}
