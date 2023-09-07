import {Injectable, OnInit} from '@angular/core';
import {User} from "../../model/user.model";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {GROOPS_TOKEN, SERVER_API_URL} from "../../constants/app.constants";
import {ErrorHandlerService} from "../error/error-handler.service";

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

    public updateUser(username: string, firstName: string, lastName: string, dateOfBirth: Date, description: string, file: any | null): Observable<any> {
        const command = {
            username,
            firstName,
            lastName,
            dateOfBirth,
            description
        };
        if (file !== null) {
            const token = localStorage.getItem(GROOPS_TOKEN);
            if (token === null) {
                throw new Error("Token missing");
            }
            const formData: FormData = new FormData();
            formData.append('file1', file);

            const blob = new Blob([JSON.stringify(command)], {
                type: 'application/json',
            });
            formData.append('file2', blob);
            const xhr = new XMLHttpRequest()
            xhr.onreadystatechange = (e) => {
                if (xhr.status === 200) {
                    console.log('SUCCESS', xhr.responseText);
                } else {
                    console.warn('request_error');
                }
            };
            xhr.open('POST', `${this.usersUrl}/current/upload-profile`, false);
            xhr.setRequestHeader('Authorization', token.toString())
            xhr.send(formData);
            return new Observable()
        }
        return this.http.put(`${this.usersUrl}/current`, command);
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
