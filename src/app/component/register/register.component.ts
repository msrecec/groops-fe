import {Component, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {Error} from "../../model/error.model";
import {catchError, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {CONFIRM_EMAIL, HOME, LOGIN} from "../../constants/app.constants";
import {transitionAnimation} from "../../animation/transition.animation";
import {UserCreateCommand} from "../../command/user.create.command";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    animations: [transitionAnimation]
})
export class RegisterComponent {
    username: string = ""
    email: string = ""
    password: string = ""
    firstName: string = ""
    lastName: string = ""
    dob: string = ""
    description: string | null = null
    errorToggle: Boolean = false
    usernameRequiredError: string = ""
    usernameTakenError: string = ""
    emailRequiredError: string = ""
    emailFormatError: string = ""
    passwordRequiredError: string = ""
    passwordValidationMessages: String[] = []
    firstNameRequiredError: string = ""
    lastNameRequiredError: string = ""
    dobRequiredError: string = ""


    constructor(private userService: UserService, private router: Router) {
    }

    register() {
        this.usernameRequiredError = ""
        this.usernameTakenError = ""
        this.emailRequiredError = ""
        this.emailFormatError = ""
        this.passwordRequiredError = ""
        this.passwordValidationMessages = []
        this.firstNameRequiredError = ""
        this.lastNameRequiredError = ""
        this.dobRequiredError = ""
        const command: UserCreateCommand = new UserCreateCommand(this.username, this.firstName, this.lastName, new Date(this.dob), this.description, this.email, this.password)
        this.userService.register(command).pipe(catchError(err => this.showErrorMessage(err))).subscribe(() => {
            this.toConfirmMail()
        })
    }

    private toConfirmMail() {
        this.router.navigate([`/${CONFIRM_EMAIL}`]).then(() => console.log(`Navigating to ${CONFIRM_EMAIL} page`));
    }

    private showErrorMessage(errorRes: Error) {
        let errorMessage = 'An unknown error occurred';

        if (errorRes != null) {
            this.errorToggle = true
            if (errorRes.message != null) {
                if (errorRes.message.includes("duplicate key value violates unique constraint \"user_username_un_idx\"")) {
                    this.usernameTakenError = "username taken"
                    return throwError(() => new Error(false, errorRes.message, errorRes.status))
                }
                let errorMessages = errorRes.message.split(';')
                for (let message of errorMessages) {
                    const messageTrimmed = message.trim()
                    if (message.includes("Password")) {
                        this.passwordValidationMessages.push(message)
                        continue
                    }
                    switch (messageTrimmed) {
                        case 'username is required': {
                            this.usernameRequiredError = 'username is required'
                            break
                        }
                        case 'first name is required': {
                            this.firstNameRequiredError = 'first name is required'
                            break
                        }
                        case 'last name is required': {
                            this.lastNameRequiredError = 'last name is required'
                            break
                        }
                        case 'date of birth is required': {
                            this.dobRequiredError = 'date of birth is required'
                            break
                        }
                        case 'email is required': {
                            this.emailRequiredError = 'email is required'
                            break
                        }
                        case 'format must be a valid email': {
                            this.emailFormatError = 'format must be a valid email'
                            break
                        }
                        case 'password is required': {
                            this.passwordRequiredError = 'password is required'
                            break
                        }
                    }
                }
                return throwError(() => new Error(false, errorRes.message, errorRes.status))
            }
        }
        return throwError(() => errorMessage);
    }

    protected readonly String = String;
}
