import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditDeleteComponent } from './account-edit-delete.component';

describe('AccountEditDeleteComponent', () => {
  let component: AccountEditDeleteComponent;
  let fixture: ComponentFixture<AccountEditDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountEditDeleteComponent]
    });
    fixture = TestBed.createComponent(AccountEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
