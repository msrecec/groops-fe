import {Component} from '@angular/core';
import {transitionAnimation} from "../../animation/transition.animation";
import {VerificationService} from "../../service/verification/verification.service";

@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.css'],
    animations: [transitionAnimation]
})
export class ConfirmEmailComponent {
    constructor(private verificationService: VerificationService) {
    }

    resend() {
        this.verificationService.resendVerification().subscribe()
    }

}
