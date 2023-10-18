import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgPlayerComponent } from './svg-player.component';

describe('SvgPlayerComponent', () => {
  let component: SvgPlayerComponent;
  let fixture: ComponentFixture<SvgPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SvgPlayerComponent]
    });
    fixture = TestBed.createComponent(SvgPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
