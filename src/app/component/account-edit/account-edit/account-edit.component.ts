import {Component} from '@angular/core';
import {UserService} from "../../../service/user/user.service";
import {Router} from "@angular/router";
import {UserCreateCommand} from "../../../command/user.create.command";
import {catchError, throwError} from "rxjs";
import {CONFIRM_EMAIL, CONFIRM_PASSWORD} from "../../../constants/app.constants";
import {Error} from "../../../model/error.model";
import {transitionAnimation} from "../../../animation/transition.animation";
import {AuthService} from "../../../service/auth/auth.service";

@Component({
    selector: 'app-account-edit',
    templateUrl: './account-edit.component.html',
    styleUrls: ['./account-edit.component.css'],
    animations: [transitionAnimation]
})
export class AccountEditComponent {
    heightSet300 = false
    errorToggle: Boolean = false
    errorMessage: String = "Something went wrong"
    email: string = ""
    password1: string = ""
    password2: string = ""
    emailRequiredError: string = ""
    emailFormatError: string = ""
    passwordRequiredError1: string = ""
    passwordRequiredError2: string = ""
    passwordValidationMessages: String[] = []


    constructor(private userService: UserService, private router: Router, private authService: AuthService) {
    }

    changePassword() {
        this.emailRequiredError = ""
        this.emailFormatError = ""
        this.passwordRequiredError1 = ""
        this.passwordRequiredError2 = ""
        this.passwordValidationMessages = []
        this.userService.changePassword(this.password1, this.password2).pipe(catchError(err => this.handleShowErrorMessage(err))).subscribe(() => {
            this.toConfirmPassword()
        })
    }

    changeEmail() {
        this.emailRequiredError = ""
        this.emailFormatError = ""
        this.passwordRequiredError1 = ""
        this.passwordRequiredError2 = ""
        this.passwordValidationMessages = []
        this.userService.changeEmail(this.email).pipe(catchError(err => this.handleShowErrorMessage(err))).subscribe(() => {
            this.toConfirmMail()
        })
    }

    private toConfirmMail() {
        this.router.navigate([`/${CONFIRM_EMAIL}`]).then(() => console.log(`Navigating to ${CONFIRM_EMAIL} page`))
            .then(() => {
                this.authService.logout().subscribe()
            })
    }

    private toConfirmPassword() {
        this.router.navigate([`/${CONFIRM_PASSWORD}`]).then(() => console.log(`Navigating to ${CONFIRM_PASSWORD} page`))
            .then(() => {
                this.authService.logout().subscribe()
            });
    }

    private handleShowErrorMessage(errorRes: Error) {
        const obs = this.showErrorMessage(errorRes)
        const el = document.getElementById('accountEditPasswordValidationMessagesForm')
        if (!el) {
            return obs
        }
        if (this.heightSet300) {
            this.heightSet300 = !this.heightSet300
            el.setAttribute('style', 'height: 150px')
        }
        if (this.passwordValidationMessages.length === 0) {
            return obs
        }
        this.heightSet300 = !this.heightSet300
        el.setAttribute('style', 'height: 300px')
        return obs
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
                    if (msg.includes("*") || msg.includes("Password validation failed")) {
                        continue
                    }
                    if (msg.includes("Password") || msg.includes("Passwords")) {
                        this.passwordValidationMessages.push(msg)
                        continue
                    }
                    if (msg === 'First password must not be blank') {
                        this.passwordRequiredError1 = 'password is required'
                        continue
                    }
                    if (msg === 'Second password must not be blank') {
                        this.passwordRequiredError2 = 'password is required'
                        continue
                    }
                    if (msg === 'Second password must not be blank') {
                        this.passwordRequiredError2 = 'password is required'
                        continue
                    }
                    if (msg === 'email is required') {
                        this.emailRequiredError = 'email is required'
                        continue
                    }
                    if (msg === 'format must be a valid email') {
                        this.emailFormatError = 'format must be a valid email'
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
