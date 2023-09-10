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

    constructor(private groupService: GroupService, private errorHandlerService: ErrorHandlerService) {
    }

    ngOnInit(): void {
        this.groupService.resetMy()
        this.groupService.search(null, !this.groupService.isMy())
            .pipe(catchError(this.errorHandlerService.handleError))
            .subscribe(groups => {
                this.groups = groups
            })
    }

}
