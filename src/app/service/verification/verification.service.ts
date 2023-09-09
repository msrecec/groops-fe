import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ErrorHandlerService} from "../error/error-handler.service";
import {SERVER_API_URL} from "../../constants/app.constants";

@Injectable({
    providedIn: 'root'
})
export class VerificationService {
    private usersUrl = `${SERVER_API_URL}/users`;
    private verificationResendUrl = `${this.usersUrl}/resend-verification`

    constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
    }

    public resendVerification() {
        return this.http.post(this.verificationResendUrl, {})
    }

}
