import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLeaveComponent } from './group-leave.component';

describe('GroupLeaveComponent', () => {
  let component: GroupLeaveComponent;
  let fixture: ComponentFixture<GroupLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupLeaveComponent]
    });
    fixture = TestBed.createComponent(GroupLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
