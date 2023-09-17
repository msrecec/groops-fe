import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {
    GROOPS_TOKEN,
    SERVER_API_URL,
    VERIFICATION_RESEND_TOKEN,
    VERIFICATION_RESEND_TOKEN_HEADER
} from "../constants/app.constants";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    skipRoutes: string[] = ["api/groops/users/current/upload-profile", "api/groops/groups/profile-picture", "profile-picture", "post/media"]

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request || !request.url || (request.url.startsWith('http') && !(SERVER_API_URL && request.url.startsWith(SERVER_API_URL)))) {
            return next.handle(request).pipe(
                tap(event => this.handleResponse(event))
            );
        }

        const token = localStorage.getItem(GROOPS_TOKEN);
        if (token !== null) {
            request = request.clone({
                setHeaders: {
                    Authorization: token
                }
            });
        }

        if (request.url.includes("users/resend-verification")) {

            const verificationResendToken = localStorage.getItem(VERIFICATION_RESEND_TOKEN)

            if (verificationResendToken !== null) {
                request = request.clone({
                    headers: new HttpHeaders({"authorization-x-verification-resend": verificationResendToken})
                });
            }
        }

        // add content type
        if (!request.headers.has('Content-Type') && this.notInRoutes(request.url)) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return next.handle(request).pipe(
            tap(event => this.handleResponse(event))
        );
    }

    private notInRoutes(route: String): boolean {
        for (let skipRoute of this.skipRoutes) {
            if (route.includes(skipRoute)) {
                return false;
            }
        }
        return true;
    }

    private handleResponse(event: HttpEvent<any>): void {
        if (!(event instanceof HttpResponse)) {
            return
        }
        const token = event.headers.get(VERIFICATION_RESEND_TOKEN_HEADER)
        if (token === null) {
            return;
        }
        localStorage.setItem(VERIFICATION_RESEND_TOKEN, token)
    }

}
