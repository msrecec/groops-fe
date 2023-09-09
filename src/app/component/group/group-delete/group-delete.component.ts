import {Component} from '@angular/core';
import {transitionAnimation} from "../../../animation/transition.animation";
import {GroupService} from "../../../service/group/group.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CONFIRM_EMAIL, GROUP, GROUPS} from "../../../constants/app.constants";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Error} from "../../../model/error.model";

@Component({
    selector: 'app-group-delete',
    templateUrl: './group-delete.component.html',
    styleUrls: ['./group-delete.component.css'],
    animations: [transitionAnimation]
})
export class GroupDeleteComponent {
    errorMessage: string = ""
    errorToggle: Boolean = false
    constructor(private groupService: GroupService, private router: Router, private route: ActivatedRoute) {
    }

    delete() {
        const id = this.route.snapshot.paramMap.get("id")
        if (!id) {
            console.error("Missing id")
            return
        }
        this.errorToggle = false
        this.groupService.delete(id).pipe(catchError((err) => {
            return this.showErrorMessage(err)
        })).subscribe((group) => {
            this.router.navigate([`${GROUPS}`]).then(() => console.log(`Navigating to ${GROUPS} page`))
        })
    }

    cancel() {
        const id = this.route.snapshot.paramMap.get("id")
        if (!id) {
            console.error("Missing id")
            return
        }
        this.router.navigate([`${GROUPS}`, id]).then(() => console.log(`Navigating to ${GROUPS} : ${id} page`))
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
