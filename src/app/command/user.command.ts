export class UserCommand {
    username: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date
    description: string | null


    constructor(username: string, firstName: string, lastName: string, dateOfBirth: Date, description: string | null) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.description = description;
    }
}
