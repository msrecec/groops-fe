import {Injectable} from '@angular/core';
import {GROOPS_EXP, GROOPS_TOKEN, HOME, LOGIN, SERVER_API_URL} from "../../constants/app.constants";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import jwt_decode from 'jwt-decode';
import {catchError, Observable, tap} from "rxjs";
import {ErrorHandlerService} from "../error/error-handler.service";
import {Token} from "../../model/token.model";
import {RxStompService} from "../../stomp/rx-stomp.service";
import {myRxStompConfig} from "../../stomp/rx-stomp-config.config";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = `${SERVER_API_URL}/authentication`;
    private tokenExpirationTimer: any;
    private tokenPrefix = 'Bearer '
    private justLoggedIn = true

    constructor(private http: HttpClient, private router: Router, private errorHandlerService: ErrorHandlerService, private rxStompService: RxStompService) {
    }

    private nop() {
        return this.http.get<any>(`${this.authUrl}/nop`)
    }

    public hasJustLoggedIn() {
        const justLoggedInTemp = this.justLoggedIn;
        this.justLoggedIn = false
        return justLoggedInTemp
    }

    public login(username: string, password: string) {
        return this.http.post<{ token: String }>(`${this.authUrl}/login`, {username, password})
            .pipe(
                catchError(this.errorHandlerService.handleError),
                tap((resData) => {
                    this.handleAuthentication(resData.token.trim());
                    this.justLoggedIn = true
                    this.router.navigate([`/${HOME}`]).then(() => console.log(`Navigating to ${HOME} page`));
                    this.connect()
                })
            );
    }

    public connect() {
        console.log('Connecting to websockets')
        const token = localStorage.getItem(GROOPS_TOKEN)
        if (!token) {
            console.error("Missing token in subscribe")
            if (this.rxStompService.connected()) {
                this.rxStompService.deactivate().then(() => {
                    console.log('Deactivating ws connection')
                })
            }
            return
        }
        const tokenModel = this.getDecodedAccessToken(token.toString())
        this.rxStompService.connected$.subscribe(() => {
            console.log(`Subscribing for notifications for user: ${tokenModel.id}`)
            this.rxStompService.stompClient.subscribe(`/ws/secured/notifications/user/${tokenModel.id}`, (msg) => {
                console.dir(msg)
                console.log("Message body:")
                console.log(msg.body)
            }, {
                Authorization: token
            })
        })
        if (this.rxStompService.connected()) {
            console.log('Already connected, skipping reconnect...')
            return;
        }
        myRxStompConfig.connectHeaders = {
            Authorization: token
        }
        this.rxStompService.configure(myRxStompConfig)
        try {
            console.log('Connecting to websockets')
            this.rxStompService.activate()
            console.log('Successfully connected to websockets')
        } catch (error) {
            console.error('Error while connecting to websockets')
            console.error(error)
        }
    }

    public disconnect() {
        if (!this.rxStompService.connected()) {
            console.error('Already disconnected')
            return
        }
        this.rxStompService.deactivate().then(() => {
            console.log('Deactivating ws connection')
        })
    }

    private handleAuthentication(token: String) {
        const tokenModel = this.getDecodedAccessToken(token.toString())
        const date = new Date(0)
        date.setUTCSeconds(tokenModel.exp)
        localStorage.setItem(GROOPS_EXP, date.toString())
        localStorage.setItem(GROOPS_TOKEN, token.toString())
        this.autoLogout(date).subscribe();
        return tokenModel
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
                this.handleLogout();
                if (!this.rxStompService.connected()) {
                    this.router.navigate([`/${LOGIN}`]).then(() => {
                        console.log(`Navigating to: ${LOGIN}`)
                    });
                    return
                }
                this.rxStompService.deactivate().then(() => {
                    console.log('Deactivated WS connection')
                }).catch((err) => {
                    console.error('Error while deactivating websocket connection...')
                    console.error(err)
                }).finally(() => {
                    this.router.navigate([`/${LOGIN}`]).then(() => {
                        console.log(`Navigating to: ${LOGIN}`)
                    });
                })
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

    public getDecodedAccessToken(token: string): Token {
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

    // public autoLogin() {
    //   this.nop().pipe(catchError(this.handleAutoLoginError)).subscribe(() => {
    //     this.handleAutoLogin().subscribe();
    //   })
    // }

    // private handleAutoLoginError() {
    //   return this.handleLogout();
    // }

    // private handleAutoLogin() {
    //   let groopsExpString = localStorage.getItem(GROOPS_EXP);
    //   if (groopsExpString) {
    //     let exp = new Date(groopsExpString);
    //     return this.autoLogout(exp).pipe(tap(() => {
    //       this.router.navigate([`/${HOME}`]).then(() => console.log(`Navigating to ${HOME} page`));
    //     }));
    //   }
    //   return this.logout();
    // }

    private handleLogoutNoRoute() {
        this.clearToken();
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        return console.log(`Navigating to ${LOGIN} page`);
    }

    private handleLogout() {
        this.clearToken();
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        return console.log(`Navigating to ${LOGIN} page`);
    }

    private clearToken() {
        localStorage.removeItem(GROOPS_EXP);
        localStorage.removeItem(GROOPS_TOKEN);
    }

}
