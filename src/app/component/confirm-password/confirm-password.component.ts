import {Component, ViewEncapsulation} from '@angular/core';
import {transitionAnimation} from "../../animation/transition.animation";
import {VerificationService} from "../../service/verification/verification.service";

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css'],
  animations: [transitionAnimation]
})
export class ConfirmPasswordComponent {
  constructor(private verificationService: VerificationService) {
  }

  resend() {
    this.verificationService.resendVerification().subscribe()
  }
}
