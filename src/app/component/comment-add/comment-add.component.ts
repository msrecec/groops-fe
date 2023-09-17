import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GroupService} from "../../service/group/group.service";
import {Error} from "../../model/error.model";
import {CONFIRM_EMAIL, CONFIRM_PASSWORD} from "../../constants/app.constants";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css']
})
export class CommentAddComponent {
  @Input() postId: string = ""
  text: string = ""
  errorToggle: Boolean = false
  errorMessage: String = "Something went wrong"
  @Output() addedComment = new EventEmitter<boolean>();


  constructor(private groupService: GroupService) {
  }

  public addComment() {
    this.errorToggle = false
    this.groupService.addComment(this.postId, this.text)
      .pipe(
        catchError(err => this.showErrorMessage(err))
      ).subscribe(() => {
        this.addedComment.emit(true)
    })
  }

  private showErrorMessage(errorRes: Error) {
    let errorMessage = 'An unknown error occurred';

    if (errorRes != null && errorRes.status != null) {
      if (errorRes.status === 401 || errorRes.status === 403 || errorRes.status === 400) {
        this.errorToggle = true
      }
      if (errorRes.message != null) {
        const msgSplit = errorRes.message.split(';')
        for (let msgNonTrimmed of msgSplit) {
          const msg = msgNonTrimmed.trim()
          this.errorMessage = msg
        }
        return throwError(() => new Error(false, errorRes.message, errorRes.status))
      }
    }
    return throwError(() => errorMessage);
  }

}
