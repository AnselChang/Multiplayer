import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouseIndicatorComponent } from './mouse-indicator.component';

describe('MouseIndicatorComponent', () => {
  let component: MouseIndicatorComponent;
  let fixture: ComponentFixture<MouseIndicatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MouseIndicatorComponent]
    });
    fixture = TestBed.createComponent(MouseIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
