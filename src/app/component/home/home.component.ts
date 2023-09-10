import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {transitionAnimation} from "../../animation/transition.animation";
import {AuthService} from "../../service/auth/auth.service";
import {RxStompService} from "../../stomp/rx-stomp.service";
import {GROOPS_TOKEN} from "../../constants/app.constants";
import {IFrame, StompHeaders} from "@stomp/rx-stomp";
import {UserService} from "../../service/user/user.service";
import {catchError, tap} from "rxjs";
import {ErrorHandlerService} from "../../service/error/error-handler.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [transitionAnimation]
})
export class HomeComponent implements OnInit {
    justLoggedIn = false

    constructor(private authService: AuthService, private userService: UserService, private errorHandlerService: ErrorHandlerService) {
    }

    ngOnInit(): void {
    }
}
