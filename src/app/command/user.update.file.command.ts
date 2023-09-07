import {UserCommand} from "./user.command";

export class UserUpdateFileCommand extends UserCommand {
    file: File;
    constructor(username: string, firstName: string, lastName: string, dateOfBirth: Date, description: string | null, file: File) {
        super(username, firstName, lastName, dateOfBirth, description);
        this.file = file;
    }
}
