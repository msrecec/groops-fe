import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserUpdateFileCommand} from "../../command/user.update.file.command";
import {catchError, Observable, throwError} from "rxjs";
import {UserCommand} from "../../command/user.command";
import {User} from "../../model/user.model";
import {PROFILE} from "../../constants/app.constants";
import {HttpErrorResponse} from "@angular/common/http";
import {Error} from "../../model/error.model";
import {transitionAnimation} from "../../animation/transition.animation";
import {GroupService} from "../../service/group/group.service";
import {Post} from "../../model/post.model";
import {ErrorHandlerService} from "../../service/error/error-handler.service";

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css'],
    animations: [transitionAnimation]
})
export class PostsComponent implements OnInit {
    showPosts = true
    my: boolean = false
    groupId: string | null = null
    postId: string | null = null
    posts: Post[] = []

    constructor(private route: ActivatedRoute, private groupService: GroupService, private errorHandlerService: ErrorHandlerService) {
        const groupId = route.snapshot.paramMap.get("id")
        if (!groupId) {
            console.error("Missing group id")
            return
        }
        this.groupId = groupId
    }

    ngOnInit(): void {
        this.showPosts = false
        this.groupService.getPostsMySearch(this.my, this.groupId).pipe(
            catchError(this.errorHandlerService.handleError)
        ).subscribe(posts => {
            this.posts = posts
            this.showPosts = true
        })
    }


    handleToggleMyPostsEvent(event: boolean) {
        this.my = event
        this.showPosts = false
        this.groupService.getPostsMySearch(event, this.groupId).pipe(
            catchError(this.errorHandlerService.handleError)
        ).subscribe(posts => {
            this.posts = []
            this.posts = posts
            this.showPosts = true
        })
    }

}
