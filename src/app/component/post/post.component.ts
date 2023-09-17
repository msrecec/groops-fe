import {Component, Input} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GroupService} from "../../service/group/group.service";
import {GROUP, PROFILE} from "../../constants/app.constants";
import {catchError, Observable, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Error} from "../../model/error.model";
import {transitionAnimation} from "../../animation/transition.animation";
import {User} from "../../model/user.model";
import {Post} from "../../model/post.model";
import {RoleEnum} from "../../model/enum/role.constants";
import {Comment} from "../../model/comment.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations: [transitionAnimation]
})
export class PostComponent {
  showComments = false;
  comments: Comment[] = []
  post: Post | null = null
  user: User | null = null
  currentUser: User | null = null
  role: RoleEnum | null = null
  imgLoaded = false;
  profilePicture: string = ""
  profilePictureThumbnail: string = ""
  text: string = ""
  @Input() groupId: string = ""
  @Input() postId: string = ""
  errorToggle: Boolean = false
  errorMessage: string = ''
  fileToUpload: File | null = null
  localUrl: any[] | null = null;

  constructor(private userService: UserService, private router: Router, private groupService: GroupService) {

  }

  ngOnInit(): void {
    this.userService.getCurrentUser().pipe(catchError((err) => {
      return this.showErrorMessage(err)
    })).subscribe((currentUser) => {
      this.currentUser = currentUser
      this.groupService.getCurrentUserRoleEnum(this.groupId).pipe(catchError(err => {
        return this.showErrorMessage(err)
      })).subscribe(role => {
        this.role = role
        this.findPost()
      })
    })
  }

  onLoad(image: HTMLImageElement) {
    image.setAttribute('style', 'display: block')
    this.imgLoaded = true
  }


  private toGroup() {
    this.router.navigate([`/${GROUP.replace(":id", this.groupId)}`]).then(() => this.handleNavigation(GROUP));
  }

  private handleNavigation(route: string) {
    console.log(`Navigating to ${route} page`)
  }

  deletePost() {
    this.groupService.deletePost(this.groupId, this.postId).pipe(
      catchError(err => this.showErrorMessage(err))
    ).subscribe(() => {
      this.toGroup()
    })
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

  like() {
    this.groupService.like(this.groupId, this.postId).pipe(
      catchError(err => this.showErrorMessage(err))
    ).subscribe(() => {
      this.findPost()
    })
  }

  dislike() {
    this.groupService.dislike(this.groupId, this.postId).pipe(
      catchError(err => this.showErrorMessage(err))
    ).subscribe(() => {
      this.findPost()
    })
  }

  findPost() {
    this.groupService.findPostById(this.groupId, this.postId).pipe(
      catchError(err => this.showErrorMessage(err))
    ).subscribe((post) => {
      this.text = post.text
      this.profilePicture = post.mediaDownloadLink
      this.profilePictureThumbnail = post.mediaThumbnailDownloadLink
      this.user = post.user
      this.post = post
    })
  }

  onCommentAddHandler() {
    this.showComments = true
    this.groupService.getComments(this.postId).pipe(
      catchError(err => this.showErrorMessage(err))
    ).subscribe(
      (comments) => {
        this.comments = comments
        this.findPost()
      }
    )
  }

  expandCommentsToggle() {
    if (this.showComments) {
      this.comments = []
      this.showComments = false
      return
    }
    this.groupService.getComments(this.postId).pipe(
      catchError(err => this.showErrorMessage(err))
    ).subscribe(
      (comments) => {
        this.comments = comments
        this.showComments = true
      }
    )
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
  protected readonly RoleEnum = RoleEnum;
}
