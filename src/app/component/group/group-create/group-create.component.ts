import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user/user.service";
import {Router} from "@angular/router";
import {UserUpdateFileCommand} from "../../../command/user.update.file.command";
import {catchError, Observable, throwError} from "rxjs";
import {UserCommand} from "../../../command/user.command";
import {User} from "../../../model/user.model";
import {GROUP, GROUPS, PROFILE} from "../../../constants/app.constants";
import {HttpErrorResponse} from "@angular/common/http";
import {Error} from "../../../model/error.model";
import {transitionAnimation} from "../../../animation/transition.animation";
import {GroupService} from "../../../service/group/group.service";

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css'],
  animations: [transitionAnimation]
})
export class GroupCreateComponent implements OnInit {
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

  constructor(private groupService: GroupService, private router: Router) {

  }

  ngOnInit(): void {
  }



  onLoad(image: HTMLImageElement) {
    image.setAttribute('style', 'display: block')
    this.imgLoaded = true
  }

  createGroup() {
    this.usernameRequiredError = ""
    this.usernameTakenError = ""
    this.isSpinning = true
    this.errorToggle = false
    if (this.fileToUpload) {
      this.groupService.createGroupWithFile(this.name.trim(), this.fileToUpload).pipe(catchError((err) => {
        this.isSpinning = false;
        return this.showErrorMessage(err)
      })).subscribe((group) => {
        this.isSpinning = false
        this.toGroupById(group.id)
      })
      return
    }
    this.groupService.createGroupWithoutFile(this.name).pipe(catchError((err) => {
      this.isSpinning = false;
      return this.showErrorMessage(err)
    })).subscribe((group) => {
      this.isSpinning = false
      this.toGroupById(group.id)
    })
  }

  private editProfileComponents(user: User) {
    this.name = user.username.toString()
    this.profilePicture = user.profilePictureDownloadLink ? user.profilePictureDownloadLink.toString() : ''
    this.profilePictureThumbnail = user.profilePictureThumbnailDownloadLink ? user.profilePictureThumbnailDownloadLink.toString() : ''
  }

  private toGroupById(id: number) {
    const idString = id.toString()
    this.router.navigate([`/${GROUP.replace(":id", idString)}`]).then(() => this.handleNavigation(GROUP));
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
