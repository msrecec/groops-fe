import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {catchError, tap, throwError} from "rxjs";
import {Error} from "../../model/error.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  errorToggle: Boolean = false
  errorMessage: String = "Something went wrong"
  username = '';
  password = '';

  constructor(private authService: AuthService) {
  }

  login() {
    console.log('Sending login')
    this.authService.login(this.username, this.password).pipe(
      catchError(err => this.showErrorMessage(err)),
      tap(
        (value) => {
          console.log(`Successfully logged in with date ${value.exp}`)
        }
      )
    ).subscribe();
  }

  private showErrorMessage(errorRes: Error) {
    let errorMessage = 'An unknown error occurred';

    if (errorRes != null && errorRes.status != null) {
      if (errorRes.status === 401 || errorRes.status === 403 || errorRes.status === 400) {
        this.errorToggle = true
      }
      if (errorRes.message != null) {
        this.errorMessage = errorRes.message
        return throwError(() => new Error(false, errorRes.message, errorRes.status))
      }
    }
    return throwError(() => errorMessage);
  }

}
