import {Role} from "./role.model";

export class GroupRoles {
    private _groupId: number;
    private _roles: Role[];


    constructor(groupId: number, roles: Role[]) {
        this._groupId = groupId;
        this._roles = roles;
    }


    get groupId(): number {
        return this._groupId;
    }

    set groupId(value: number) {
        this._groupId = value;
    }

    get roles(): Role[] {
        return this._roles;
    }

    set roles(value: Role[]) {
        this._roles = value;
    }
}
