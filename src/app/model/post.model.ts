import {User} from "./user.model";
import {Group} from "./group.model";
import {group} from "@angular/animations";

export class Post {
    private _id: number;
    private _mediaKey: string;
    private _user: User;
    private _group: Group;
    private _mediaDownloadLink: string;
    private _mediaThumbnailDownloadLink: string;
    private _likeCount: number;
    private _commentCount: number;

    constructor(id: number, mediaKey: string, user: User, group: Group, mediaDownloadLink: string, mediaThumbnailDownloadLink: string, likeCount: number, commentCount: number) {
        this._id = id;
        this._mediaKey = mediaKey;
        this._user = user;
        this._group = group;
        this._mediaDownloadLink = mediaDownloadLink;
        this._mediaThumbnailDownloadLink = mediaThumbnailDownloadLink;
        this._likeCount = likeCount;
        this._commentCount = commentCount;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get mediaKey(): string {
        return this._mediaKey;
    }

    set mediaKey(value: string) {
        this._mediaKey = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    get group(): Group {
        return this._group;
    }

    set group(value: Group) {
        this._group = value;
    }

    get mediaDownloadLink(): string {
        return this._mediaDownloadLink;
    }

    set mediaDownloadLink(value: string) {
        this._mediaDownloadLink = value;
    }

    get mediaThumbnailDownloadLink(): string {
        return this._mediaThumbnailDownloadLink;
    }

    set mediaThumbnailDownloadLink(value: string) {
        this._mediaThumbnailDownloadLink = value;
    }

    get likeCount(): number {
        return this._likeCount;
    }

    set likeCount(value: number) {
        this._likeCount = value;
    }

    get commentCount(): number {
        return this._commentCount;
    }

    set commentCount(value: number) {
        this._commentCount = value;
    }
}
