import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../model/comment.model";
import {transitionAnimation} from "../../animation/transition.animation";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  animations: [transitionAnimation]
})
export class CommentComponent {
  @Input() comments: Comment[] = []

}
