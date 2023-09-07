import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordForgotConfirmationComponent } from './password-forgot-confirmation.component';

describe('PasswordForgotConfirmationComponent', () => {
  let component: PasswordForgotConfirmationComponent;
  let fixture: ComponentFixture<PasswordForgotConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordForgotConfirmationComponent]
    });
    fixture = TestBed.createComponent(PasswordForgotConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
