import {Component, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../service/user/user.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
    username: string = ""
    email: string = ""
    password: string = ""
    firstName: string = ""
    lastName: string = ""
    dob: string = ""
    description: string | null = null


    constructor(private userService: UserService) {
    }

    register() {
        this.userService.register(this.username, this.password, this.email, this.firstName, this.lastName, new Date(this.dob), this.description).subscribe()
    }

}
