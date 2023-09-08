import { Component } from '@angular/core';
import {transitionAnimation} from "../../../animation/transition.animation";
import {LOGIN} from "../../../constants/app.constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-password-forgot-confirmation',
  templateUrl: './password-forgot-confirmation.component.html',
  styleUrls: ['./password-forgot-confirmation.component.css'],
  animations: [transitionAnimation]
})
export class PasswordForgotConfirmationComponent {
  constructor(private router: Router) {
  }
  routeToLogin() {
    this.router.navigate([`/${LOGIN}`]).then(() => console.log(`Navigating to ${LOGIN} page`));
  }
}
