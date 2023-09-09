import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {Router} from "@angular/router";
import {catchError, finalize, map, Observable, throwError} from "rxjs";
import {CONFIRM_EMAIL, PROFILE} from "../../constants/app.constants";
import {Error} from "../../model/error.model";
import {User} from "../../model/user.model";
import {transitionAnimation} from "../../animation/transition.animation";
import {HttpErrorResponse} from "@angular/common/http";
import {UserCommand} from "../../command/user.command";
import {UserUpdateFileCommand} from "../../command/user.update.file.command";
import {UserUpdateCommand} from "../../command/user.update.command";

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.css'],
    animations: [transitionAnimation]
})
export class ProfileEditComponent implements OnInit {
    imgLoaded = false;
    profilePicture: string = ""
    profilePictureThumbnail: string = ""
    username: string = ""
    password: string = ""
    firstName: string = ""
    lastName: string = ""
    dob: string = ""
    description: string | null = null
    errorToggle: Boolean = false
    errorMessage: string = ''
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
    isSpinning = false

    constructor(private userService: UserService, private router: Router) {

    }

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe((user) => this.editProfileComponents(user))
    }

    onLoad(image: HTMLImageElement) {
        image.setAttribute('style', 'display: block')
        this.imgLoaded = true
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
        this.isSpinning = true
        this.errorToggle = false
        if (this.fileToUpload) {
            const fileCommand: UserUpdateFileCommand = new UserUpdateFileCommand(this.username.trim(), this.firstName.trim(), this.lastName.trim(), new Date(this.dob.trim()), this.description ? this.description.trim() : "", this.fileToUpload)
            this.userService.updateUserWithFile(fileCommand).pipe(catchError((err) => {
                this.isSpinning = false;
                return this.showErrorMessage(err)
            })).subscribe(() => {
                this.isSpinning = false
                this.toProfile()
            })
            return
        }
        const command: UserCommand = new UserCommand(this.username.trim(), this.firstName.trim(), this.lastName.trim(), new Date(this.dob.trim()), this.description ? this.description.trim() : "")
        this.isSpinning = true
        this.userService.updateUserWithoutFile(command).pipe(catchError((err) => {
            this.isSpinning = false;
            return this.showErrorMessage(err)
        })).subscribe(() => {
            this.isSpinning = false
            this.toProfile()
        })
    }

    private editProfileComponents(user: User) {
        this.username = user.username.toString()
        this.firstName = user.firstName.toString()
        this.lastName = user.lastName.toString()
        this.dob = user.dateOfBirth.toString()
        this.description = user.description.toString()
        this.profilePicture = user.profilePictureDownloadLink ? user.profilePictureDownloadLink.toString() : ''
        this.profilePictureThumbnail = user.profilePictureThumbnailDownloadLink ? user.profilePictureThumbnailDownloadLink.toString() : ''
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


    private showErrorMessage(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred';
        if (!error) {
            return new Observable<never>()
        }
        const errorRes = error.error

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
                    this.errorMessage = messageTrimmed
                }
                return throwError(() => new Error(false, errorRes.message, errorRes.status))
            }
        }
        return throwError(() => errorMessage);
    }

    protected readonly String = String;
}
