import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {LOGIN, REGISTER} from "../../constants/app.constants";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BaseComponent {


  constructor(private router: Router) {
  }

  routeToLogin() {
    this.router.navigate([`/${LOGIN}`]).then(() => console.log(`Navigating to ${LOGIN} homepage`));
  }
  routeToRegister() {
    this.router.navigate([`/${REGISTER}`]).then(() => console.log(`Navigating to ${REGISTER} homepage`));
  }

}
