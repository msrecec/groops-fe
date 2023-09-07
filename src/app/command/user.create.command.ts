import {UserCommand} from "./user.command";

export class UserCreateCommand extends UserCommand {
    email: string;
    password: string;

    constructor(username: string, firstName: string, lastName: string, dateOfBirth: Date, description: string | null, email: string, password: string) {
        super(username, firstName, lastName, dateOfBirth, description);
        this.email = email;
        this.password = password;
    }
}
