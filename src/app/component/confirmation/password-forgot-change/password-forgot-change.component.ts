import {Component} from '@angular/core';
import {Error} from "../../../model/error.model";
import {CONFIRM_EMAIL, CONFIRM_PASSWORD, LOGIN, PASSWORD_FORGOT} from "../../../constants/app.constants";
import {catchError, tap, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../service/user/user.service";
import {transitionAnimation} from "../../../animation/transition.animation";

@Component({
    selector: 'app-password-forgot-change',
    templateUrl: './password-forgot-change.component.html',
    styleUrls: ['./password-forgot-change.component.css'],
    animations: [transitionAnimation]
})
export class PasswordForgotChangeComponent {
    errorToggle: Boolean = false
    errorMessage: String = "Something went wrong"
    password1 = '';
    password2 = '';
    passwordRequiredError1 = '';
    passwordRequiredError2 = '';

    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    }

    confirm() {
        console.log('Sending password confirmation')
        this.errorMessage = ''
        this.passwordRequiredError1 = ''
        this.passwordRequiredError2 = ''
        const token = this.route.snapshot.queryParamMap.get('password-forgot')
        if (!token) {
            console.error('Missing required query param')
            return
        }
        this.userService.confirmPassword(this.password1, this.password2, token).pipe(
            catchError(err => this.showErrorMessage(err)),
            tap((value) => {
                console.log(`Successfully confirmed password`)
            })).subscribe(() => {
            this.routeToPasswordChangeConfirmation()
        });
    }

    routeToPasswordChangeConfirmation() {
        this.router.navigate([`/${PASSWORD_FORGOT}`]).then(() => console.log(`Navigating to ${PASSWORD_FORGOT} page`));
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
                    if (msg === 'First password must not be blank') {
                        this.passwordRequiredError1 = 'password is required'
                        continue
                    }
                    if (msg === 'Second password must not be blank') {
                        this.passwordRequiredError2 = 'password is required'
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
