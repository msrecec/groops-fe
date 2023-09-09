import { Component } from '@angular/core';
import {UserService} from "../../../service/user/user.service";
import {Router} from "@angular/router";
import {UserUpdateFileCommand} from "../../../command/user.update.file.command";
import {catchError, Observable, throwError} from "rxjs";
import {UserCommand} from "../../../command/user.command";
import {User} from "../../../model/user.model";
import {PROFILE} from "../../../constants/app.constants";
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
export class GroupCreateComponent {
  imgLoaded = false;
  profilePicture: string = ""
  profilePictureThumbnail: string = ""
  username: string = ""
  dob: string = ""
  description: string | null = null
  errorToggle: Boolean = false
  usernameRequiredError: string = ""
  usernameTakenError: string = ""
  fileToUpload: File | null = null
  localUrl: any[] | null = null;
  isSpinning = false

  constructor(private groupService: GroupService, private router: Router) {

  }

  onLoad(image: HTMLImageElement) {
    image.setAttribute('style', 'display: block')
    this.imgLoaded = true
  }

  updateProfile() {
    this.usernameRequiredError = ""
    this.usernameTakenError = ""
    this.isSpinning = true
    if (this.fileToUpload) {
      this.groupService.createGroupWithFile(this.username.trim()).pipe(catchError((err) => {
        this.isSpinning = false;
        return this.showErrorMessage(err)
      })).subscribe(() => {
        this.isSpinning = false
        this.toProfile()
      })
      return
    }
    const command: UserCommand = new UserCommand(this.username.trim(), this.firstName.trim(), this.lastName.trim(), new Date(this.dob.trim()), this.description ? this.description.trim() : "")
    this.isSpinning = true
    this.userService.updateUserWithoutFile(command).pipe(catchError((err) => {
      this.isSpinning = false;
      return this.showErrorMessage(err)
    })).subscribe(() => {
      this.isSpinning = false
      this.toProfile()
    })
  }

  private editProfileComponents(user: User) {
    this.username = user.username.toString()
    this.profilePicture = user.profilePictureDownloadLink ? user.profilePictureDownloadLink.toString() : ''
    this.profilePictureThumbnail = user.profilePictureThumbnailDownloadLink ? user.profilePictureThumbnailDownloadLink.toString() : ''
  }

  private toProfile() {
    this.router.navigate([`/${PROFILE}`]).then(() => this.handleNavigation(PROFILE));
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
        }
        return throwError(() => new Error(false, errorRes.message, errorRes.status))
      }
    }
    return throwError(() => errorMessage);
  }

  protected readonly String = String;
}
