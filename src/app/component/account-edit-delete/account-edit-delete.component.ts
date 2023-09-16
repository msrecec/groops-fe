import {Component} from '@angular/core';
import {GroupService} from "../../service/group/group.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Observable, tap, throwError} from "rxjs";
import {ACCOUNT_EDIT, BASE, GROOPS_TOKEN, GROUPS} from "../../constants/app.constants";
import {HttpErrorResponse} from "@angular/common/http";
import {Error} from "../../model/error.model";
import {transitionAnimation} from "../../animation/transition.animation";
import {UserService} from "../../service/user/user.service";
import {AuthService} from "../../service/auth/auth.service";

@Component({
    selector: 'app-account-edit-delete',
    templateUrl: './account-edit-delete.component.html',
    styleUrls: ['./account-edit-delete.component.css'],
    animations: [transitionAnimation]
})
export class AccountEditDeleteComponent {
    errorMessage: string = ""
    errorToggle: Boolean = false

    constructor(private userService: UserService, private router: Router, private authService: AuthService) {
    }

    delete() {
        this.errorToggle = false
        this.userService.deleteAccount().pipe(catchError((err) => {
                return this.showErrorMessage(err)
            }),
            tap(() => {
                this.authService.disconnect()
                localStorage.removeItem(GROOPS_TOKEN)
                this.router.navigate([`${BASE}`]).then(() => console.log(`Navigating to ${BASE} page`))
            })
        ).subscribe()
    }

    cancel() {
        this.router.navigate([`${ACCOUNT_EDIT}`]).then(() => console.log(`Navigating to ${ACCOUNT_EDIT} page`))
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
                let errorMessages = errorRes.message.split(';')
                for (let message of errorMessages) {
                    const messageTrimmed = message.trim()
                    this.errorMessage = message
                }
                return throwError(() => new Error(false, errorRes.message, errorRes.status))
            }
        }
        return throwError(() => errorMessage);
    }

    protected readonly String = String;
}
