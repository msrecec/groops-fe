import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListComponentComponent } from './group-list-component.component';

describe('GroupListComponentComponent', () => {
  let component: GroupListComponentComponent;
  let fixture: ComponentFixture<GroupListComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupListComponentComponent]
    });
    fixture = TestBed.createComponent(GroupListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
