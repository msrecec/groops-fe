import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../service/group/group.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../../../model/user.model";
import {GROUP, GROUPS} from "../../../constants/app.constants";
import {HttpErrorResponse} from "@angular/common/http";
import {Error} from "../../../model/error.model";
import {transitionAnimation} from "../../../animation/transition.animation";
import {Group} from "../../../model/group.model";

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css'],
  animations: [transitionAnimation]
})
export class GroupEditComponent implements OnInit {
  imgLoaded = false;
  profilePicture: string = ""
  profilePictureThumbnail: string = ""
  name: string = ""
  errorToggle: Boolean = false
  usernameRequiredError: string = ""
  usernameTakenError: string = ""
  errorMessage: string = ""
  fileToUpload: File | null = null
  localUrl: any[] | null = null;
  isSpinning = false

  constructor(private groupService: GroupService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    if (id === null) {
      console.error("Missing id in param")
      return
    }
    this.groupService.getGroupById(id).subscribe((user) => this.editProfileComponents(user))
  }


  onLoad(image: HTMLImageElement) {
    image.setAttribute('style', 'display: block')
    this.imgLoaded = true
  }

  cancel() {
    const id = this.route.snapshot.paramMap.get("id")
    if (!id) {
      console.error("Missing id")
      return
    }
    this.router.navigate([`${GROUP.replace(":id", id)}`]).then(() => console.log(`Navigating to ${GROUPS} : ${id} page`))
  }

  createGroup() {
    this.usernameRequiredError = ""
    this.usernameTakenError = ""
    this.isSpinning = true
    this.errorToggle = false
    const id = this.route.snapshot.paramMap.get("id")
    if (id === null) {
      console.error("Missing id in param")
      return
    }
    if (this.fileToUpload) {
      this.groupService.updateGroupWithFile(id, this.name.trim(), this.fileToUpload).pipe(catchError((err) => {
        this.isSpinning = false;
        return this.showErrorMessage(err)
      })).subscribe((group) => {
        this.isSpinning = false
        this.toGroupById(group.id)
      })
      return
    }
    this.groupService.updateGroupWithoutFile(id, this.name).pipe(catchError((err) => {
      this.isSpinning = false;
      return this.showErrorMessage(err)
    })).subscribe((group) => {
      this.isSpinning = false
      this.toGroupById(group.id)
    })
  }

  private editProfileComponents(user: Group) {
    this.name = user.name.toString()
    this.profilePicture = user.profilePictureDownloadLink ? user.profilePictureDownloadLink.toString() : ''
    this.profilePictureThumbnail = user.profilePictureThumbnailDownloadLink ? user.profilePictureThumbnailDownloadLink.toString() : ''
  }

  private toGroupById(id: number) {
    this.router.navigate([`/${GROUPS}`, id]).then(() => this.handleNavigation(GROUP));
  }

  private handleNavigation(route: string) {
    console.log(`Navigating to ${route} page`)
  }

  showPreviewImageAndSetFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.localUrl = null;
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      }
      this.fileToUpload = event.target.files[0]
      reader.readAsDataURL(event.target.files[0]);
    }
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
        if (errorRes.message.includes("duplicate key value violates unique constraint \"group_name_un_idx\"")) {
          this.usernameTakenError = "name taken"
          return throwError(() => new Error(false, errorRes.message, errorRes.status))
        }
        let errorMessages = errorRes.message.split(';')
        for (let message of errorMessages) {
          const messageTrimmed = message.trim()
          switch (messageTrimmed) {
            case 'name is required': {
              this.usernameRequiredError = 'name is required'
              break
            }
          }
          this.errorMessage = message
        }
        return throwError(() => new Error(false, errorRes.message, errorRes.status))
      }
    }
    return throwError(() => errorMessage);
  }

  protected readonly String = String;
}
