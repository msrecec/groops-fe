import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {ErrorHandlerService} from "../../service/error/error-handler.service";
import {catchError} from "rxjs";
import {Notification} from "../../model/notification.model";
import {Router} from "@angular/router";
import {EntityTypeEnum} from "../../model/enum/entity-type-enum.constants";
import {GROUP, GROUP_REQUESTS, POST} from "../../constants/app.constants";
import {transitionAnimation} from "../../animation/transition.animation";

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css'],
    animations: [transitionAnimation]
})
export class NotificationsComponent implements OnInit {
    notifications: Notification[] = []

    constructor(private authService: AuthService, private errorHandlerService: ErrorHandlerService, private router: Router) {
    }

    ngOnInit(): void {
        this.getNotifications()
    }


    getNotifications() {
        this.authService.getNotifications().pipe(
            catchError(this.errorHandlerService.handleError)
        ).subscribe(
            notifications => {
                this.notifications = notifications
                this.authService.refreshNotificationCount()
            }
        )
    }

    route(notification: Notification) {
        switch (notification.entityType) {
            case EntityTypeEnum.COMMENT:
                this.router.navigate([POST.replace(":id", notification.relatedEntityId.toString())
                    .replace(":postId", notification.entityId.toString())])
                    .then(() => {console.log(`Navigating to ${POST}`)})
                break
            case EntityTypeEnum.GROUP_ACCEPT:
                this.router.navigate([GROUP.replace(":id", notification.entityId.toString())])
                    .then(() => {console.log(`Navigating to ${GROUP}`)})
                break
            case EntityTypeEnum.GROUP_REQUEST:
                this.router.navigate([GROUP_REQUESTS.replace(":id", notification.entityId.toString())])
                    .then(() => {console.log(`Navigating to ${GROUP_REQUESTS}`)})
                break
            case EntityTypeEnum.LIKE:
                console.log(POST.replace(":id", notification.relatedEntityId.toString())
                    .replace(":postId", notification.entityId.toString()))
                this.router.navigate([POST.replace(":id", notification.relatedEntityId.toString())
                    .replace(":postId", notification.entityId.toString())])
                    .then(() => {console.log(`Navigating to ${POST}`)})
                break
            case EntityTypeEnum.POST:
                this.router.navigate([POST.replace(":id", notification.relatedEntityId.toString())
                    .replace(":postId", notification.entityId.toString())])
                    .then(() => {console.log(`Navigating to ${POST}`)})
                break
            default:
                console.error("Unsupported notification type")
        }
    }

}
