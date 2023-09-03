import {Component, ViewEncapsulation} from '@angular/core';
import {transitionAnimation} from "../../animation/transition.animation";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [transitionAnimation]
})
export class ConfirmEmailComponent {

}
