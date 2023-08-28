import {Injectable} from '@angular/core';
import {GROOPS, LOGIN, SERVER_API_URL} from "../../constants/app.constants";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, tap} from "rxjs";
import {ErrorHandlerService} from "../error/error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${SERVER_API_URL}/authentication`;
  private tokenExpirationTimer: any;
  private groopsExp = 'groops-exp';

  constructor(private http: HttpClient, private router: Router, private errorHandlerService: ErrorHandlerService) {
  }

  private nop() {
    return this.http.get<any>(`${this.authUrl}/nop`)
  }

  public login(username: string, password: string) {
    return this.http.post<{ exp: Date }>(`${this.authUrl}/login`, {username: String, password: String})
      .pipe(
        catchError(this.errorHandlerService.handleError),
        tap((resData) => {
          this.handleAuthentication(resData.exp);
          this.router.navigate([`/${GROOPS}`]).then(() => console.log("Navigating to groops homepage"));
        })
      );
  }

  private handleAuthentication(exp: Date) {
    localStorage.setItem(this.groopsExp, exp.toString());
    this.autoLogout(exp);
  }

  private autoLogout(exp: Date) {
    const expirationDuration: number = exp.getTime() - new Date().getTime();
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
    return new Observable();
  }

  public logout() {
    return this.http.post<any>(`${this.authUrl}/logout`, {}).pipe(
      catchError(this.errorHandlerService.handleError),
      tap(() => {
        this.handleLogout();
      })
    )
  }

  public autoLogin() {
    this.nop().pipe(catchError(this.handleAutoLoginError), tap(this.handleAutoLogin)
    )
  }

  private handleAutoLoginError() {
    return this.handleLogout();
  }

  private handleAutoLogin() {
    let groopsExpString = localStorage.getItem(this.groopsExp);
    if (groopsExpString) {
      let exp = new Date(groopsExpString);
      return this.autoLogout(exp).pipe(tap(() => {
        this.router.navigate([`/${GROOPS}`]).then(() => console.log("Navigating to groops homepage"));
      }));
    }
    return this.logout();
  }

  private handleLogout() {
    this.clearExp();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate([`/${LOGIN}`]).then(r => console.log("Logging out..."));
    return new Observable();
  }

  private clearExp() {
    localStorage.removeItem(this.groopsExp);
  }

}
