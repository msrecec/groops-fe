import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {transitionAnimation} from "../../animation/transition.animation";
import {AuthService} from "../../service/auth/auth.service";
import {RxStompService} from "../../stomp/rx-stomp.service";
import {GROOPS_TOKEN} from "../../constants/app.constants";
import {IFrame, StompHeaders} from "@stomp/rx-stomp";
import {UserService} from "../../service/user/user.service";
import {catchError, tap} from "rxjs";
import {ErrorHandlerService} from "../../service/error/error-handler.service";
import {Post} from "../../model/post.model";
import {ActivatedRoute} from "@angular/router";
import {GroupService} from "../../service/group/group.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [transitionAnimation]
})
export class HomeComponent implements OnInit {
    showPosts = true
    my: boolean = false
    groupId: string | null = null
    postId: string | null = null
    posts: Post[] = []

    constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute, private groupService: GroupService, private errorHandlerService: ErrorHandlerService) {
        // const groupId = route.snapshot.paramMap.get("id")
        // if (!groupId) {
        //     console.error("Missing group id")
        //     return
        // }
        // this.groupId = groupId
    }

    ngOnInit(): void {
        this.showPosts = false
        this.groupService.getPostsMySearch(this.my, null).pipe(
            catchError(this.errorHandlerService.handleError)
        ).subscribe(posts => {
            this.posts = posts
            this.showPosts = true
        })
    }


    handleToggleMyPostsEvent(event: boolean) {
        this.my = event
        this.showPosts = false
        this.groupService.getPostsMySearch(event, null).pipe(
            catchError(this.errorHandlerService.handleError)
        ).subscribe(posts => {
            this.posts = []
            this.posts = posts
            this.showPosts = true
        })
    }
}
