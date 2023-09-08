import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordForgotChangeComponent } from './password-forgot-change.component';

describe('PasswordForgotChangeComponent', () => {
  let component: PasswordForgotChangeComponent;
  let fixture: ComponentFixture<PasswordForgotChangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordForgotChangeComponent]
    });
    fixture = TestBed.createComponent(PasswordForgotChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
