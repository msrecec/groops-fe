import {UserCommand} from "./user.command";

export class UserCreateCommand extends UserCommand {
    email: string;
    password1: string;
    password2: string;

    constructor(username: string, firstName: string, lastName: string, dateOfBirth: Date, description: string | null, email: string, password1: string, password2: string) {
        super(username, firstName, lastName, dateOfBirth, description);
        this.email = email;
        this.password1 = password1;
        this.password2 = password2;
    }
}
