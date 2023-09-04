import { Component } from '@angular/core';
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
export class ProfileComponent {

}
