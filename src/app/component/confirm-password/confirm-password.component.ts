import {Component, ViewEncapsulation} from '@angular/core';
import {transitionAnimation} from "../../animation/transition.animation";

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [transitionAnimation]
})
export class ConfirmPasswordComponent {

}
