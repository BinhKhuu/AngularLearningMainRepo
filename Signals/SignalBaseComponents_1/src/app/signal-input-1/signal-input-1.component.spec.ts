import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalInput1Component } from './signal-input-1.component';

describe('SignalInput1Component', () => {
  let component: SignalInput1Component;
  let fixture: ComponentFixture<SignalInput1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalInput1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalInput1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
