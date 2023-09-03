import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {LOGIN, REGISTER} from "../../constants/app.constants";
import {transitionAnimation} from "../../animation/transition.animation";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [transitionAnimation]
})
export class BaseComponent {


  constructor(private router: Router) {
  }

  routeToLogin() {
    this.router.navigate([`/${LOGIN}`]).then(() => console.log(`Navigating to ${LOGIN} page`));
  }
  routeToRegister() {
    this.router.navigate([`/${REGISTER}`]).then(() => console.log(`Navigating to ${REGISTER} page`));
  }

}
