import {Injectable, OnInit} from '@angular/core';
import {User} from "../../model/user.model";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {SERVER_API_URL} from "../../constants/app.constants";
import {ErrorHandlerService} from "../error/error-handler.service";

@Injectable({
    providedIn: 'root'
})
export class UserService implements OnInit {
    currentUser: User | null | undefined
    private usersUrl = `${SERVER_API_URL}/users`;
    private registerURL: string = `${this.usersUrl}/register`;

    constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
    }

    ngOnInit(): void {
        this.currentUser = null;
    }

    public getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${this.usersUrl}/current-user`);
    }

    public register(username: string, password: string, email: string, firstName: string, lastName: string, dateOfBirth: Date, description: string | null) {
        return this.http.post<User>(this.registerURL, {
            username: username,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            description: description
        }).pipe(catchError(this.errorHandlerService.handleError))
    }

}
