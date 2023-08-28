import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {catchError, tap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService) {
  }

  login() {
    console.log('Sending login')
    this.authService.login(this.username, this.password).pipe(
      tap(
        (value) => {
          console.log(`Successfully logged in with date ${value.exp}`)
        }
      )
    );
  }

}
