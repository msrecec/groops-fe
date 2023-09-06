import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {AuthService} from "../service/auth/auth.service";
import {Router} from "@angular/router";
import {LOGIN} from "../constants/app.constants";
import {Error} from "../model/error.model";

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate([`/${LOGIN}`]).then(() => console.log(`Navigating to ${LOGIN} page`));
        }
        return throwError(() => err)
      })
    );
  }
}
