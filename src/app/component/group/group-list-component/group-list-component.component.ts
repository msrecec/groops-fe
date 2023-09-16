import {Component, OnInit} from '@angular/core';
import {transitionAnimation} from "../../../animation/transition.animation";
import {GroupService} from "../../../service/group/group.service";
import {Group} from "../../../model/group.model";
import {ErrorHandlerService} from "../../../service/error/error-handler.service";
import {catchError, tap} from "rxjs";
import {GROUP, GROUPS} from "../../../constants/app.constants";
import {Router} from "@angular/router";

@Component({
    selector: 'app-group-list-component',
    templateUrl: './group-list-component.component.html',
    styleUrls: ['./group-list-component.component.css'],
    animations: [transitionAnimation]
})
export class GroupListComponentComponent implements OnInit {
    groups: Group[] = []
    memberSet: Set<number> = new Set<number>
    joinSet: Set<number> = new Set<number>
    isHere = true
    search: string | null = null

    constructor(private groupService: GroupService, private errorHandlerService: ErrorHandlerService, private router: Router) {
    }

    ngOnInit(): void {
        this.search = null
        this.isHere = false
        this.groupService.resetMy()
        this.memberSet = new Set<number>()
        this.joinSet = new Set<number>()
        this.groupService.search(null, !this.groupService.isMy())
            .pipe(catchError(this.errorHandlerService.handleError))
            .subscribe(groups => {
                this.isHere = true
                this.groups = groups
                for (let group of groups) {
                    if (group.my) {
                        this.memberSet.add(group.id)
                    }
                    if (group.sentJoin) {
                        this.joinSet.add(group.id)
                    }
                }
            })
    }

    handleToggleMyEvent(my: boolean) {
        this.search = null
        this.isHere = false
        this.memberSet = new Set<number>()
        this.joinSet = new Set<number>()
        this.groupService.search(null, !my)
            .pipe(catchError(this.errorHandlerService.handleError))
            .subscribe(groups => {
                this.isHere = true
                this.groups = groups
                for (let group of groups) {
                    if (group.my) {
                        this.memberSet.add(group.id)
                    }
                    if (group.sentJoin) {
                        this.joinSet.add(group.id)
                    }
                }
            })
    }

    handleSearchEvent(search: string | null) {
        this.isHere = false
        this.memberSet = new Set<number>()
        this.joinSet = new Set<number>()
        this.groupService.search(search, !this.groupService.isMy())
            .pipe(catchError(this.errorHandlerService.handleError))
            .subscribe(groups => {
                this.isHere = true
                this.groups = groups
                for (let group of groups) {
                    if (group.my) {
                        this.memberSet.add(group.id)
                    }
                    if (group.sentJoin) {
                        this.joinSet.add(group.id)
                    }
                }
            })
    }

    requestJoiningGroup(id: number) {
        this.groupService.join(id.toString())
            .pipe(tap(() => {
                this.joinSet.add(id)
                }),
                catchError(this.errorHandlerService.handleError))
            .subscribe()
    }

    cancelRequestJoiningGroup(id: number) {
        this.groupService.cancelJoin(id.toString())
            .pipe(tap(() => {
                this.joinSet.delete(id)
                }),
                catchError(this.errorHandlerService.handleError))
            .subscribe()
    }

    toGroupById(id: number) {
        if (!this.isMember(id)) {
            return;
        }
        this.router.navigate([`/${GROUP.replace(":id", (id ? id.toString() : ""))}`]).then(() => this.handleNavigation(`/${GROUPS}/${id}/posts`));
    }

    private handleNavigation(route: string) {
        console.log(`Navigating to ${route} page`)
    }

    isMember(id: number) {
        return this.memberSet.has(id)
    }

    hasRequestedJoin(id: number) {
        return this.joinSet.has(id)
    }

    toGroupPosts() {

    }

}
