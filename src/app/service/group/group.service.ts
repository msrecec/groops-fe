import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SERVER_API_URL} from "../../constants/app.constants";
import {UserUpdateFileCommand} from "../../command/user.update.file.command";
import {UserUpdateCommand} from "../../command/user.update.command";
import {Group} from "../../model/group.model";
import {GroupRoles} from "../../model/group.roles.model";
import {Observable} from "rxjs";
import {User} from "../../model/user.model";
import {RoleEnum} from "../../model/enum/role.constants";

@Injectable({
    providedIn: 'root'
})
export class GroupService {
    private groupURL = `${SERVER_API_URL}/groups`
    private myGroups = true;

    constructor(private http: HttpClient) {
    }

    public isMy() {
        return this.myGroups;
    }

    public resetMy() {
        this.myGroups = true
    }

    public toggleMy() {
        this.myGroups = !this.myGroups
    }

    public search(name: string | null, my: boolean | null) {
        return this.http.post<Group[]>(`${this.groupURL}/search`, {
            name: name,
            my: my
        });
    }

    public getGroupById(id: string): Observable<Group> {
        return this.http.get<Group>(`${this.groupURL}/${id}`);
    }

    public getGroupRolesForCurrentUserById(id: string) {
        return this.http.get<GroupRoles>(`${this.groupURL}/${id}/authorities`);
    }

    public createGroupWithFile(name: string, file: File): Observable<Group> {
        const formData: FormData = new FormData();
        formData.append('file', file);

        const blob = new Blob([JSON.stringify({name: name})], {
            type: 'application/json',
        });
        formData.append('command', blob);

        return this.http.post<Group>(`${this.groupURL}/profile-picture`, formData);
    }

    public createGroupWithoutFile(name: string): Observable<Group> {
        return this.http.post<Group>(`${this.groupURL}`, {name: name});
    }

    public createPostWithFile(text: string, file: File): Observable<Group> {
        const formData: FormData = new FormData();
        formData.append('file', file);

        const blob = new Blob([JSON.stringify({text: text})], {
            type: 'application/json',
        });
        formData.append('command', blob);

        return this.http.post<Group>(`${this.groupURL}/post/media`, formData);
    }

    public createPostWithoutFile(text: string): Observable<Group> {
        return this.http.post<Group>(`${this.groupURL}/post`, {text: text});
    }

    public updateGroupWithFile(id: string, name: string, file: File): Observable<Group> {
        const formData: FormData = new FormData();
        formData.append('file', file);

        const blob = new Blob([JSON.stringify({name: name})], {
            type: 'application/json',
        });
        formData.append('command', blob);

        return this.http.put<Group>(`${this.groupURL}/${id}/profile-picture`, formData);
    }

    public updateGroupWithoutFile(id: string, name: string): Observable<Group> {
        return this.http.put<Group>(`${this.groupURL}/${id}`, {name: name});
    }

    public delete(id: string) {
        return this.http.delete(`${this.groupURL}/${id}`)
    }

    public leave(id: string) {
        return this.http.delete(`${this.groupURL}/leave/${id}`)
    }

    public join(id: string) {
        return this.http.post(`${this.groupURL}/${id}/request`, {})
    }

    public cancelJoin(id: string) {
        return this.http.delete(`${this.groupURL}/${id}/request`)
    }

    public getAllRequestsByGroupId(id: string) {
      return this.http.get<User[]>(`${this.groupURL}/${id}/request`)
    }

    public acceptGroupRequest(groupId: string, userId: string, role: RoleEnum) {
      return this.http.put<any>(`${this.groupURL}/${groupId}/request/user/${userId}`, {role: role})
    }

    public rejectGroupRequest(groupId: string, userId: string) {
      return this.http.delete<any>(`${this.groupURL}/${groupId}/request/user/${userId}`)
    }

}
