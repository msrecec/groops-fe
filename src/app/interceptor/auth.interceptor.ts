import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GROOPS_TOKEN, SERVER_API_URL} from "../constants/app.constants";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    skipRoutes: string[] = ["api/groops/users/current/upload-profile"]

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request || !request.url || (request.url.startsWith('http') && !(SERVER_API_URL && request.url.startsWith(SERVER_API_URL)))) {
            return next.handle(request);
        }

        const token = localStorage.getItem(GROOPS_TOKEN);
        if (token !== null) {
            request = request.clone({
                setHeaders: {
                    Authorization: token
                }
            });
        }

        // add content type
        if (!request.headers.has('Content-Type') && this.notInRoutes(request.url)) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return next.handle(request);
    }

    private notInRoutes(route: String): boolean {
        for (let skipRoute of this.skipRoutes) {
            if (route.includes(skipRoute)) {
                return false;
            }
        }
        return true;
    }

}
