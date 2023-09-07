import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCreateConfirmationComponent } from './email-create-confirmation.component';

describe('EmailCreateConfirmationComponent', () => {
  let component: EmailCreateConfirmationComponent;
  let fixture: ComponentFixture<EmailCreateConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailCreateConfirmationComponent]
    });
    fixture = TestBed.createComponent(EmailCreateConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
