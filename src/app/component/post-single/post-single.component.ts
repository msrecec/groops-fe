import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.css']
})
export class PostSingleComponent {
  groupId: string | null = null
  postId: string | null = null
  constructor(private route: ActivatedRoute) {
    const groupId = route.snapshot.paramMap.get("id")
    if(!groupId) {
      console.error("Missing group id")
      return
    }
    this.groupId = groupId
    const postId = route.snapshot.paramMap.get("postId")
    if(!postId) {
      console.error("Missing post id")
      return
    }
    this.postId = postId
  }
}
