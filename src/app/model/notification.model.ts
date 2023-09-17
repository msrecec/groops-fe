import {User} from "./user.model";
import {EntityTypeEnum} from "./enum/entity-type-enum.constants";

export class Notification {
    private _id: number;
    private _user: User;
    private _message: string;
    private _entityId: number;
    private _relatedEntityId: number;
    private _entityType: EntityTypeEnum;
    private _read: Boolean


    constructor(id: number, user: User, message: string, entityId: number, relatedEntityId:number, entityType: EntityTypeEnum, read: Boolean) {
        this._id = id;
        this._user = user;
        this._message = message;
        this._entityId = entityId;
        this._relatedEntityId = relatedEntityId;
        this._entityType = entityType;
        this._read = read;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    get entityId(): number {
        return this._entityId;
    }

    set entityId(value: number) {
        this._entityId = value;
    }


    get relatedEntityId(): number {
        return this._relatedEntityId;
    }

    set relatedEntityId(value: number) {
        this._relatedEntityId = value;
    }

    get entityType(): EntityTypeEnum {
        return this._entityType;
    }

    set entityType(value: EntityTypeEnum) {
        this._entityType = value;
    }


    get read(): Boolean {
        return this._read;
    }

    set read(value: Boolean) {
        this._read = value;
    }
}
