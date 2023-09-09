import {PermissionEnum} from "./enum/permission.constants";

export class Permission {
    private _id: number;
    private _permission: PermissionEnum;


    constructor(id: number, permission: PermissionEnum) {
        this._id = id;
        this._permission = permission;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get permission(): PermissionEnum {
        return this._permission;
    }

    set permission(value: PermissionEnum) {
        this._permission = value;
    }
}
