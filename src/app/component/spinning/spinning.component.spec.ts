import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinningComponent } from './spinning.component';

describe('SpinningComponent', () => {
  let component: SpinningComponent;
  let fixture: ComponentFixture<SpinningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinningComponent]
    });
    fixture = TestBed.createComponent(SpinningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
