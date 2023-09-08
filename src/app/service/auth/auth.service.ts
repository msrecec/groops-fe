import {Injectable} from '@angular/core';
import {GROOPS_EXP, GROOPS_TOKEN, HOME, LOGIN, SERVER_API_URL} from "../../constants/app.constants";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import jwt_decode from 'jwt-decode';
import {catchError, Observable, tap} from "rxjs";
import {ErrorHandlerService} from "../error/error-handler.service";
import {Token} from "../../model/token.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${SERVER_API_URL}/authentication`;
  private tokenExpirationTimer: any;
  private tokenPrefix = 'Bearer '

  constructor(private http: HttpClient, private router: Router, private errorHandlerService: ErrorHandlerService) {
  }

  private nop() {
    return this.http.get<any>(`${this.authUrl}/nop`)
  }

  public login(username: string, password: string) {
    return this.http.post<{ token: String }>(`${this.authUrl}/login`, {username, password})
      .pipe(
        catchError(this.errorHandlerService.handleError),
        tap((resData) => {
          this.handleAuthentication(resData.token.trim());
          this.router.navigate([`/${HOME}`]).then(() => console.log(`Navigating to ${HOME} page`));
        })
      );
  }

  private handleAuthentication(token: String) {
    const tokenModel = this.getDecodedAccessToken(token.toString())
    const date = new Date(0)
    date.setUTCSeconds(tokenModel.exp)
    localStorage.setItem(GROOPS_EXP, date.toString())
    localStorage.setItem(GROOPS_TOKEN, token.toString())
    this.autoLogout(date).subscribe();
  }

  private autoLogout(exp: Date) {
    const expirationDuration: number = (new Date(exp.toString())).getTime() - new Date().getTime();
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout().subscribe();
    }, expirationDuration);
    return new Observable();
  }

  public logout() {
    return this.http.delete<any>(`${this.authUrl}/logout`, {}).pipe(
      catchError(this.errorHandlerService.handleError),
      tap(() => {
        this.handleLogout().then();
      })
    )
  }

  public logoutNoRoute() {
    return this.http.delete<any>(`${this.authUrl}/logout`, {}).pipe(
      catchError(this.errorHandlerService.handleError),
      tap(() => {
        this.handleLogoutNoRoute()
      })
    )
  }

  private getDecodedAccessToken(token: string): Token {
    try {
      if (!token.startsWith(this.tokenPrefix)) {
        throw new Error("Invalid token")
      }
      const parsedToken = token.slice(this.tokenPrefix.length)
      return jwt_decode(parsedToken);
    } catch (err) {
      console.error(err)
      this.router.navigate([`/${LOGIN}`]).then(() => console.log(`Navigating to ${LOGIN} page`));
      return new Token("", "", "", "", -1, -1, "");
    }
  }

  public autoLogin() {
    this.nop().pipe(catchError(this.handleAutoLoginError)).subscribe(() => {
      this.handleAutoLogin().subscribe();
    })
  }

  private handleAutoLoginError() {
    return this.handleLogout();
  }

  private handleAutoLogin() {
    let groopsExpString = localStorage.getItem(GROOPS_EXP);
    if (groopsExpString) {
      let exp = new Date(groopsExpString);
      return this.autoLogout(exp).pipe(tap(() => {
        this.router.navigate([`/${HOME}`]).then(() => console.log(`Navigating to ${HOME} page`));
      }));
    }
    return this.logout();
  }

  private handleLogoutNoRoute() {
    this.clearToken();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    return console.log(`Navigating to ${LOGIN} page`);
  }

  private async handleLogout() {
    this.clearToken();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    await this.router.navigate([`/${LOGIN}`]);
    return console.log(`Navigating to ${LOGIN} page`);
  }

  private clearToken() {
    localStorage.removeItem(GROOPS_EXP);
    localStorage.removeItem(GROOPS_TOKEN);
  }

}
