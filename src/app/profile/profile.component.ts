import { Component } from '@angular/core';
import {transitionAnimation} from "../animation/transition.animation";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [transitionAnimation]
})
export class ProfileComponent {

}
