import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SERVER_API_URL} from "../../constants/app.constants";
import {UserUpdateFileCommand} from "../../command/user.update.file.command";
import {UserUpdateCommand} from "../../command/user.update.command";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupURL = `${SERVER_API_URL}/groups`

  constructor(private http: HttpClient) { }


  public createGroupWithFile(name: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const blob = new Blob([JSON.stringify({name: name})], {
      type: 'application/json',
    });
    formData.append('command', blob);

    return this.http.post(`${this.groupURL}/profile-picture`, formData);
  }

  public createGroupWithoutFile(name: string) {
    return this.http.post(`${this.groupURL}`, {name: name});
  }

}
