import { Component } from '@angular/core';
import {User} from "../../../model/user.model";
import {GroupService} from "../../../service/group/group.service";
import {ErrorHandlerService} from "../../../service/error/error-handler.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError} from "rxjs";
import {RoleEnum} from "../../../model/enum/role.constants";
import {transitionAnimation} from "../../../animation/transition.animation";
import {UserRole} from "../../../model/user.role";
import {UserService} from "../../../service/user/user.service";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [transitionAnimation]
})
export class MembersComponent {
  currentUserId: Number = -1
  users: UserRole[] = []
  currentlyChaningRoles: Set<Number> = new Set<Number>()
  selectedOption: string = "ROLE_USER"

  constructor(private groupService: GroupService, private errorHandlerService: ErrorHandlerService, private router: Router, private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    const groupId = this.route.snapshot.paramMap.get("id");
    if (!groupId) {
      console.error("Missing group id in param map")
      return
    }
    this.userService.getCurrentUser().pipe(
      catchError(this.errorHandlerService.handleError)
    ).subscribe((user) => {
      this.currentUserId = user.id
      this.groupService.getMembersByGroupId(groupId).pipe(
        catchError(this.errorHandlerService.handleError)
      ).subscribe(
        (users) => {
          this.users = users
        }
      )
    })
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
        this.groupService.getMembersByGroupId(groupId).pipe(
          catchError(this.errorHandlerService.handleError)
        ).subscribe(
          (users) => {
            this.users = users
          }
        )
      })
  }

  kickUser(userId: Number) {
    const groupId = this.route.snapshot.paramMap.get("id");
    if (!groupId) {
      console.error("Missing group id in param map")
      return
    }
    this.groupService.kickUserFromGroup(userId.toString(), groupId)
      .pipe(catchError(this.errorHandlerService.handleError))
      .subscribe(() => {
        this.currentlyChaningRoles = new Set<Number>()
        this.groupService.getMembersByGroupId(groupId).pipe(
          catchError(this.errorHandlerService.handleError)
        ).subscribe(
          (users) => {
            this.users = users
          }
        )
      })
  }

  protected readonly RoleEnum = RoleEnum;
}
