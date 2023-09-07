import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LOGIN} from "../../../constants/app.constants";

@Component({
  selector: 'app-email-change-confirmation',
  templateUrl: './email-change-confirmation.component.html',
  styleUrls: ['./email-change-confirmation.component.css']
})
export class EmailChangeConfirmationComponent {

  constructor(private router: Router) {
  }

  routeToLogin() {
    this.router.navigate([`/${LOGIN}`]).then(() => console.log(`Navigating to ${LOGIN} page`));
  }
}
