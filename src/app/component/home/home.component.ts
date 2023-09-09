import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {transitionAnimation} from "../../animation/transition.animation";
import {AuthService} from "../../service/auth/auth.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [transitionAnimation]
})
export class HomeComponent implements OnInit {
    justLoggedIn = false

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.justLoggedIn = this.authService.hasJustLoggedIn();
    }

}
