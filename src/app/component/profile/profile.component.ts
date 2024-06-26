import {Component, ElementRef, OnInit} from '@angular/core';
import {transitionAnimation} from "../../animation/transition.animation";
import {UserService} from "../../service/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, throwError} from "rxjs";
import {ACCOUNT_EDIT, CONFIRM_EMAIL, PROFILE_EDIT} from "../../constants/app.constants";
import {Error} from "../../model/error.model";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    animations: [transitionAnimation]
})
export class ProfileComponent implements OnInit {
    username: String = ''
    firstName: String = ''
    lastName: String = ''
    dateOfBirth: Date = new Date()
    description: String = ''
    profilePicture: String | null = ''
    profilePictureThumbnail: String | null = ''
    imageLoaded = false

    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe((user) => {
            this.username = user.username
            this.firstName = user.firstName
            this.lastName = user.lastName
            this.dateOfBirth = user.dateOfBirth
            this.description = user.description
            this.profilePicture = user.profilePictureDownloadLink
            this.profilePictureThumbnail = user.profilePictureThumbnailDownloadLink
        })
    }

    toProfileEdit() {
        this.router.navigate([`/${PROFILE_EDIT}`]).then(() => this.handleNavigation(PROFILE_EDIT));
    }

    isCurrent() {
        return !this.route.snapshot.paramMap.has("id")
    }

    private handleNavigation(route: string) {
        console.log(`Navigating to ${route} page`)
    }

    onLoad(image: HTMLImageElement) {
        image.setAttribute('style', 'display: block')
        this.imageLoaded = true
    }

}
