import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "./service/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'groops';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.connect()
  }
}
