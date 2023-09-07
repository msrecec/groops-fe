import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {Router} from "@angular/router";
import {catchError, throwError} from "rxjs";
import {CONFIRM_EMAIL, PROFILE} from "../../constants/app.constants";
import {Error} from "../../model/error.model";
import {User} from "../../model/user.model";
import {transitionAnimation} from "../../animation/transition.animation";

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.css'],
    animations: [transitionAnimation]
})
export class ProfileEditComponent implements OnInit {
    profilePicture: string = ""
    username: string = ""
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
    fileToUpload: File | null = null
    localUrl: any[] | null = null;

    constructor(private userService: UserService, private router: Router) {

    }

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe((user) => this.editProfileComponents(user))
    }

    updateProfile() {
        this.usernameRequiredError = ""
        this.usernameTakenError = ""
        this.emailRequiredError = ""
        this.emailFormatError = ""
        this.passwordRequiredError = ""
        this.passwordValidationMessages = []
        this.firstNameRequiredError = ""
        this.lastNameRequiredError = ""
        this.dobRequiredError = ""
        this.userService.updateUser(this.username, this.firstName, this.lastName, new Date(this.dob), this.description !== null ? this.description : '', this.fileToUpload)
            .pipe(catchError(err => this.showErrorMessage(err)))
            .subscribe(() => this.toProfile());
    }

    private editProfileComponents(user: User) {
        this.username = user.username.toString()
        this.firstName = user.firstName.toString()
        this.lastName = user.lastName.toString()
        this.dob = user.dateOfBirth.toString()
        this.description = user.description.toString()
        this.profilePicture = user.profilePictureDownloadLink.toString()
    }

    private toProfile() {
        this.router.navigate([`/${PROFILE}`]).then(() => this.handleNavigation(PROFILE));
    }

    private handleNavigation(route: string) {
        console.log(`Navigating to ${route} page`)
    }

    showPreviewImageAndSetFile(event: any) {
        if (event.target.files && event.target.files[0]) {
            this.localUrl = null;
            let reader = new FileReader();
            reader.onload = (event: any) => {
                this.localUrl = event.target.result;
            }
            this.fileToUpload = event.target.files[0]
            reader.readAsDataURL(event.target.files[0]);
        }
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
