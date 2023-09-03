import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {transitionAnimation} from "../../animation/transition.animation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [transitionAnimation]
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
  }
}
