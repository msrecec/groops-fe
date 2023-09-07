export class UserCommand {
    private username: string;
    private firstName: string;
    private lastName: string;
    private dateOfBirth: Date
    private description: string | null


    constructor(username: string, firstName: string, lastName: string, dateOfBirth: Date, description: string | null) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.description = description;
    }
}
