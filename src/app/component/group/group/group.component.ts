import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GROUP_DELETE, GROUP_EDIT, GROUP_LEAVE, GROUPS, PROFILE_EDIT} from "../../../constants/app.constants";
import {transitionAnimation} from "../../../animation/transition.animation";
import {GroupService} from "../../../service/group/group.service";
import {catchError, tap, throwError} from "rxjs";
import {ErrorHandlerService} from "../../../service/error/error-handler.service";
import {Role} from "../../../model/role.model";
import {HttpErrorResponse} from "@angular/common/http";
import {RoleEnum} from "../../../model/enum/role.constants";

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css'],
    animations: [transitionAnimation]
})
export class GroupComponent implements OnInit {
    role: Role | null = null;
    name: String = '';
    profilePicture: String | null = '';
    profilePictureThumbnail: String | null = '';
    imageLoaded = false;

    constructor(private groupService: GroupService, private router: Router, private route: ActivatedRoute, private errorHandlerService: ErrorHandlerService) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id === null) {
            console.error('Missing id in param map')
            return
        }
        this.groupService.getGroupById(id)
            .pipe(
                catchError(this.errorHandlerService.handleError),
                tap(
                    (group) => {
                        console.log(`Fetching group with id: ${group.id} and name: ${group.name}`)
                    }
                )
            )
            .subscribe((group) => {
                this.name = group.name
                this.profilePicture = group.profilePictureDownloadLink
                this.profilePictureThumbnail = group.profilePictureThumbnailDownloadLink
                this.groupService.getGroupRolesForCurrentUserById(group.id.toString()).pipe(
                    catchError((err: HttpErrorResponse) => {
                        if (err.status === 404) {
                            console.error('You are not a member of this group')
                        }
                        return throwError(() => err.message)
                    })
                ).subscribe((groupRoles) => {
                    if (groupRoles.roles.length === 0) {
                        console.error('You are a member but you have no roles, thats weird')
                    }
                    this.role = groupRoles.roles[0]
                })
            })
    }


    toGroupEdit() {
        const groupId = this.route.snapshot.paramMap.get("id")
        if (!groupId) {
            console.error('Missing group id')
            return
        }
        this.router.navigate([`/${GROUP_EDIT.replace(":id", groupId)}`]).then(() => this.handleNavigation(`/${GROUP_EDIT}`));
    }

    isAdmin() {
        return this.role?.role === RoleEnum.ROLE_ADMIN;
    }

    isMember() {
        return this.role !== null
    }

    hasRequestedJoin() {
        return true
    }

    toGroupPosts() {

    }

    leaveGroup() {
        const groupId = this.route.snapshot.paramMap.get("id")
        if (!groupId) {
            console.error('Missing group id')
            return
        }
        this.router.navigate([`/${GROUP_LEAVE.replace(":id", groupId)}`]).then(() => this.handleNavigation(`/${GROUP_LEAVE} : ${groupId}`));
    }

    deleteGroup() {
        const groupId = this.route.snapshot.paramMap.get("id")
        if (!groupId) {
            console.error('Missing group id')
            return
        }
        this.router.navigate([`/${GROUP_DELETE.replace(":id", groupId)}`]).then(() => this.handleNavigation(`/${GROUP_DELETE} : ${groupId}`));
    }

    requestJoiningGroup() {

    }

    private handleNavigation(route: string) {
        console.log(`Navigating to ${route} page`)
    }

    onLoad(image: HTMLImageElement) {
        image.setAttribute('style', 'display: block')
        this.imageLoaded = true
    }
}
