import {Injectable, OnInit} from '@angular/core';
import {User} from "../../model/user.model";
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {catchError, lastValueFrom, Observable, throwError} from "rxjs";
import {GROOPS_TOKEN, SERVER_API_URL} from "../../constants/app.constants";
import {ErrorHandlerService} from "../error/error-handler.service";
import {Error} from "../../model/error.model";

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

    public updateUserWithFile(command: {
        username: string,
        firstName: string,
        lastName: string,
        dateOfBirth: Date,
        description: string,
        file: File
    }) {
        // return new Promise((resolve, reject) => {
        //     const token = localStorage.getItem(GROOPS_TOKEN);
        //     if (token === null) {
        //         throw new HttpErrorResponse({error: new Error(false, "Token missing", 404)});
        //     }
        //     const formData: FormData = new FormData();
        //     formData.append('file1', command.file);
        //
        //     const blob = new Blob([JSON.stringify(command)], {
        //         type: 'application/json',
        //     });
        //     formData.append('file2', blob);
        //     const xhr = new XMLHttpRequest()
        //     let err = false
        //     xhr.onreadystatechange = (e) => {
        //         if (xhr.status === 200) {
        //             resolve(xhr.response)
        //             console.log('SUCCESS', xhr.responseText);
        //         } else {
        //             console.warn('request_error status: ' + xhr.status);
        //             reject(new HttpErrorResponse({error: new Error(false, xhr.responseText, xhr.status)}))
        //         }
        //     };
        //     xhr.open('POST', `${this.usersUrl}/current/upload-profile`, false);
        //     xhr.setRequestHeader('Authorization', token.toString())
        //     xhr.send(formData);

            // if (xhr.status !== 200) {
            //     throw new HttpErrorResponse({error: new Error(false, xhr.responseText, xhr.status)})
            // }
        // })

        // const token = localStorage.getItem(GROOPS_TOKEN);
        // if (token === null) {
        //     throw new HttpErrorResponse({error: new Error(false, "Token missing", 404)});
        // }
        // const formData: FormData = new FormData();
        // formData.append('file1', command.file);
        //
        // const blob = new Blob([JSON.stringify(command)], {
        //     type: 'application/json',
        // });
        // formData.append('file2', blob);
        // return fetch(`${this.usersUrl}/current/upload-profile`, {
        //     method: 'POST',
        //     body: formData
        // })


        const token = localStorage.getItem(GROOPS_TOKEN);
        if (token === null) {
            throw new HttpErrorResponse({error: new Error(false, "Token missing", 404)});
        }
        const formData: FormData = new FormData();
        formData.append('file1', command.file);

        const blob = new Blob([JSON.stringify(command)], {
            type: 'application/json',
        });
        formData.append('file2', blob);

        return lastValueFrom(this.http.post(`${this.usersUrl}/current/upload-profile`, formData, {
            // headers: new HttpHeaders().set('Content-type', 'multipart/form-data')
        }));
    }

    public updateUserWithoutFile(command: {
        username: string,
        firstName: string,
        lastName: string,
        dateOfBirth: Date,
        description: string
    }) {
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
