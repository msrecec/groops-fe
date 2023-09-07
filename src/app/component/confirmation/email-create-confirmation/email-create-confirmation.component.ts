import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LOGIN} from "../../../constants/app.constants";

@Component({
  selector: 'app-email-create-confirmation',
  templateUrl: './email-create-confirmation.component.html',
  styleUrls: ['./email-create-confirmation.component.css']
})
export class EmailCreateConfirmationComponent {
  constructor(private router: Router) {
  }

  routeToLogin() {
    this.router.navigate([`/${LOGIN}`]).then(() => console.log(`Navigating to ${LOGIN} page`));
  }
}
