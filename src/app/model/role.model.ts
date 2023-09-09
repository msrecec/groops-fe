import {RoleEnum} from "./enum/role.constants";
import {Permission} from "./permission.model";

export class Role {
    private _id: number;
    private _role: RoleEnum;
    private _permissions: Permission[]

    constructor(id: number, role: RoleEnum, permissions: Permission[]) {
        this._id = id;
        this._role = role;
        this._permissions = permissions;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get role(): RoleEnum {
        return this._role;
    }

    set role(value: RoleEnum) {
        this._role = value;
    }

    get permissions(): Permission[] {
        return this._permissions;
    }

    set permissions(value: Permission[]) {
        this._permissions = value;
    }
}
