import {Injectable, OnInit} from '@angular/core';
import {User} from "../../model/user.model";
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {catchError, lastValueFrom, Observable, throwError} from "rxjs";
import {GROOPS_TOKEN, SERVER_API_URL} from "../../constants/app.constants";
import {ErrorHandlerService} from "../error/error-handler.service";
import {Error} from "../../model/error.model";
import {UserCreateCommand} from "../../command/user.create.command";
import {UserUpdateFileCommand} from "../../command/user.update.file.command";
import {UserUpdateCommand} from "../../command/user.update.command";

@Injectable({
    providedIn: 'root'
})
export class UserService implements OnInit {
    currentUser: User | null | undefined
    private usersUrl = `${SERVER_API_URL}/users`;
    private userForgotPasswordURL = `${this.usersUrl}/forgot-password`;
    private changePasswordURL = `${this.usersUrl}/change-password`;
    private changeEmailURL = `${this.usersUrl}/change-mail`;
    private deleteAccountURL = `${this.usersUrl}/current`;
    private registerURL: string = `${this.usersUrl}/register`;
    private forgotPasswordURL: string = `${SERVER_API_URL}/templates/forgot-password/confirm`;

    constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
    }

    ngOnInit(): void {
        this.currentUser = null;
    }

    public getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${this.usersUrl}/current`);
    }

    public confirmPassword(password1: string, password2: string, token: string): Observable<any> {
        const header = new HttpHeaders({'authorization-x-password-forgot': atob(token)})
        return this.http.post<User>(this.forgotPasswordURL, {password1: password1, password2: password2}, {
            headers: header
        }).pipe(catchError(this.errorHandlerService.handleError))
    }

    public updateUserWithFile(command: UserUpdateFileCommand) {
        const formData: FormData = new FormData();
        formData.append('file', command.file);

        const blob = new Blob([JSON.stringify(command)], {
            type: 'application/json',
        });
        formData.append('command', blob);

        return this.http.post(`${this.usersUrl}/current/upload-profile`, formData);
    }

    public updateUserWithoutFile(command: UserUpdateCommand) {
        return this.http.put(`${this.usersUrl}/current`, command);
    }

    public register(command: UserCreateCommand) {
        return this.http.post<User>(this.registerURL, command).pipe(catchError(this.errorHandlerService.handleError))
    }

    public forgotPassword(username: string) {
        return this.http.post<any>(this.userForgotPasswordURL, {username: username})
            .pipe(catchError(this.errorHandlerService.handleError))
    }

    public changePassword(password1: string, password2: string) {
        return this.http.put<User>(this.changePasswordURL, {password1: password1, password2: password2}).pipe(catchError(this.errorHandlerService.handleError))
    }

    public changeEmail(email: string) {
        return this.http.put<User>(this.changeEmailURL, {email: email}).pipe(catchError(this.errorHandlerService.handleError))
    }

    public deleteAccount() {
        return this.http.delete<any>(this.deleteAccountURL)
    }

}
