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
    private registerURL: string = `${this.usersUrl}/register`;
    localUrl: any[] = [];

    constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
    }

    ngOnInit(): void {
        this.currentUser = null;
    }

    public getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${this.usersUrl}/current`);
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

}
