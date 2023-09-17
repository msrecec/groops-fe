import { Component } from '@angular/core';
import {User} from "../../../model/user.model";
import {GroupService} from "../../../service/group/group.service";
import {ErrorHandlerService} from "../../../service/error/error-handler.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError} from "rxjs";
import {RoleEnum} from "../../../model/enum/role.constants";
import {transitionAnimation} from "../../../animation/transition.animation";
import {UserRole} from "../../../model/user.role";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [transitionAnimation]
})
export class MembersComponent {
  users: UserRole[] = []
  currentlyChaningRoles: Set<Number> = new Set<Number>()
  selectedOption: string = "ROLE_USER"

  constructor(private groupService: GroupService, private errorHandlerService: ErrorHandlerService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const groupId = this.route.snapshot.paramMap.get("id");
    if (!groupId) {
      console.error("Missing group id in param map")
      return
    }
    this.groupService.getMembersByGroupId(groupId).pipe(
      catchError(this.errorHandlerService.handleError)
    ).subscribe(
      (users) => {
        this.users = users
      }
    )
  }

  changeRole(userId: Number, role: RoleEnum) {
    const groupId = this.route.snapshot.paramMap.get("id");
    if (!groupId) {
      console.error("Missing group id in param map")
      return
    }
    this.groupService.changeRole(userId.toString(), groupId, role)
      .pipe(catchError(this.errorHandlerService.handleError))
      .subscribe(() => {
        this.currentlyChaningRoles = new Set<Number>()
      })
  }

  protected readonly RoleEnum = RoleEnum;
}
