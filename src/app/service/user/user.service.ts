import {Injectable, OnInit} from '@angular/core';
import {User} from "../../model/user.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SERVER_API_URL} from "../../constants/app.constants";

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  currentUser: User | null | undefined
  private usersUrl = `${SERVER_API_URL}/users`;


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.currentUser = null;
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/current-user`);
  }

}
