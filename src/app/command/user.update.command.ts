import {UserCommand} from "./user.command";

export class UserUpdateCommand extends UserCommand {

    constructor(username: string, firstName: string, lastName: string, dateOfBirth: Date, description: string | null) {
        super(username, firstName, lastName, dateOfBirth, description);
    }
}
