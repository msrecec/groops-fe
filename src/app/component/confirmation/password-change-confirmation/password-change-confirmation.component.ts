import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LOGIN} from "../../../constants/app.constants";

@Component({
  selector: 'app-password-change-confirmation',
  templateUrl: './password-change-confirmation.component.html',
  styleUrls: ['./password-change-confirmation.component.css']
})
export class PasswordChangeConfirmationComponent {
  constructor(private router: Router) {
  }

  routeToLogin() {
    this.router.navigate([`/${LOGIN}`]).then(() => console.log(`Navigating to ${LOGIN} page`));
  }
}
