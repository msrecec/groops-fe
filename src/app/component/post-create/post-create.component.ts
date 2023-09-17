import {Component} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserUpdateFileCommand} from "../../command/user.update.file.command";
import {catchError, Observable, throwError} from "rxjs";
import {UserCommand} from "../../command/user.command";
import {User} from "../../model/user.model";
import {POST, PROFILE} from "../../constants/app.constants";
import {HttpErrorResponse} from "@angular/common/http";
import {Error} from "../../model/error.model";
import {transitionAnimation} from "../../animation/transition.animation";
import {GroupService} from "../../service/group/group.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  animations: [transitionAnimation]
})
export class PostCreateComponent {
  imgLoaded = false;
  profilePicture: string = ""
  profilePictureThumbnail: string = ""
  text: string = ""
  groupId: string = ""
  errorToggle: Boolean = false
  errorMessage: string = ''
  fileToUpload: File | null = null
  localUrl: any[] | null = null;
  isSpinning = false

  constructor(private userService: UserService, private router: Router, private groupService: GroupService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    if(!id) {
      console.error("Missing parameter id")
      return
    }
    this.groupId = id
  }

  onLoad(image: HTMLImageElement) {
    image.setAttribute('style', 'display: block')
    this.imgLoaded = true
  }


  private toPost(postId: string) {
    this.router.navigate([`/${POST.replace(":id", this.groupId).replace(":postId", postId)}`]).then(() => this.handleNavigation(POST));
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

  post() {
    this.isSpinning = true
    if (!this.fileToUpload) {
      this.groupService.createPostWithoutFile(this.groupId, this.text).pipe(
        catchError(err => this.showErrorMessage(err))
      ).subscribe((post) => {
        this.isSpinning = false
        this.toPost(post.id.toString())
      })
      return
    }
    this.groupService.createPostWithFile(this.groupId, this.text, this.fileToUpload).pipe(
      catchError(err => {
        this.isSpinning = false
        return this.showErrorMessage(err)
      })
    ).subscribe((post) => {
      this.isSpinning = false
      this.toPost(post.id.toString())
    })
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
        if (errorRes.message.includes("duplicate key value violates unique constraint \"user_username_un_idx\"")) {
          return throwError(() => new Error(false, errorRes.message, errorRes.status))
        }
        let errorMessages = errorRes.message.split(';')
        for (let message of errorMessages) {
          const messageTrimmed = message.trim()
          this.errorMessage = messageTrimmed
        }
        return throwError(() => new Error(false, errorRes.message, errorRes.status))
      }
    }
    return throwError(() => errorMessage);
  }

  protected readonly String = String;
}
