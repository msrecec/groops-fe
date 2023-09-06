import {Component, OnInit} from '@angular/core';
import {transitionAnimation} from "../../animation/transition.animation";
import {UserService} from "../../service/user/user.service";
import {Router} from "@angular/router";
import {catchError, throwError} from "rxjs";
import {CONFIRM_EMAIL} from "../../constants/app.constants";
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
  profilePicture: String = ''

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      this.username = user.username
      this.firstName = user.firstName
      this.lastName = user.lastName
      this.dateOfBirth = user.dateOfBirth
      this.description = user.description
      this.profilePicture = user.profilePictureDownloadLink
    })
  }
}
