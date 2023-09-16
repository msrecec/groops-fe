import {Component} from '@angular/core';
import {GroupService} from "../../../service/group/group.service";
import {ErrorHandlerService} from "../../../service/error/error-handler.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError} from "rxjs";
import {transitionAnimation} from "../../../animation/transition.animation";
import {User} from "../../../model/user.model";
import {RoleEnum} from "../../../model/enum/role.constants";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  animations: [transitionAnimation]
})
export class RequestsComponent {
  users: User[] = []
  selectedOption: string = "ROLE_USER"

  constructor(private groupService: GroupService, private errorHandlerService: ErrorHandlerService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const groupId = this.route.snapshot.paramMap.get("id");
    if (!groupId) {
      console.error("Missing group id in param map")
      return
    }
    this.groupService.getAllRequestsByGroupId(groupId).pipe(
      catchError(this.errorHandlerService.handleError)
    ).subscribe(
      (users) => {
        this.users = users
      }
    )
  }

  accept(userId: Number) {
    const groupId = this.route.snapshot.paramMap.get("id");
    if (!groupId) {
      console.error("Missing group id in param map")
      return
    }
    this.groupService.acceptGroupRequest(groupId.toString(), userId.toString(), this.getRole(this.selectedOption)).pipe(
      catchError(this.errorHandlerService.handleError)
    ).subscribe(() => {
      this.groupService.getAllRequestsByGroupId(groupId).pipe(
        catchError(this.errorHandlerService.handleError)
      ).subscribe(
        (users) => {
          this.users = users
        }
      )
    })
  }

  private getRole(role: string): RoleEnum {
    switch (role) {
      case "ROLE_ADMIN":
        return RoleEnum.ROLE_ADMIN
      case "ROLE_USER":
        return RoleEnum.ROLE_USER
      case "ROLE_LURKER":
        return RoleEnum.ROLE_LURKER
      default:
        throw new Error("Unsupported role")
    }
  }

  deny(userId: Number) {
    const groupId = this.route.snapshot.paramMap.get("id");
    if (!groupId) {
      console.error("Missing group id in param map")
      return
    }
    this.groupService.rejectGroupRequest(groupId.toString(), userId.toString()).pipe(
      catchError(this.errorHandlerService.handleError)
    ).subscribe(() => {
      this.groupService.getAllRequestsByGroupId(groupId).pipe(
        catchError(this.errorHandlerService.handleError)
      ).subscribe(
        (users) => {
          this.users = users
        }
      )
    })
  }


}
