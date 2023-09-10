import {Component, OnInit} from '@angular/core';
import {transitionAnimation} from "../../../animation/transition.animation";
import {GroupService} from "../../../service/group/group.service";
import {Group} from "../../../model/group.model";
import {ErrorHandlerService} from "../../../service/error/error-handler.service";
import {catchError} from "rxjs";

@Component({
    selector: 'app-group-list-component',
    templateUrl: './group-list-component.component.html',
    styleUrls: ['./group-list-component.component.css'],
    animations: [transitionAnimation]
})
export class GroupListComponentComponent implements OnInit {
    groups: Group[] = []
    memberSet: Set<number> = new Set<number>

    constructor(private groupService: GroupService, private errorHandlerService: ErrorHandlerService) {
    }

    ngOnInit(): void {
        this.groupService.resetMy()
        this.groupService.search(null, !this.groupService.isMy())
            .pipe(catchError(this.errorHandlerService.handleError))
            .subscribe(groups => {
                this.groups = groups
                for (let group of groups) {
                    if (group.my) {
                        this.memberSet.add(group.id)
                    }
                }
            })
    }

    handleToggleMyEvent(my: boolean) {
        this.groupService.search(null, !my)
            .pipe(catchError(this.errorHandlerService.handleError))
            .subscribe(groups => {
                this.groups = groups
                for (let group of groups) {
                    if (group.my) {
                        this.memberSet.add(group.id)
                    }
                }
            })
    }

    requestJoiningGroup() {

    }

    isMember(id: number) {
        return this.memberSet.has(id)
    }

    hasRequestedJoin() {
        return true
    }

    toGroupPosts() {

    }

}
