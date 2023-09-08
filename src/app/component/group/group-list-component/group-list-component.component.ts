import { Component } from '@angular/core';
import {transitionAnimation} from "../../../animation/transition.animation";

@Component({
  selector: 'app-group-list-component',
  templateUrl: './group-list-component.component.html',
  styleUrls: ['./group-list-component.component.css'],
  animations: [transitionAnimation]
})
export class GroupListComponentComponent {

}
