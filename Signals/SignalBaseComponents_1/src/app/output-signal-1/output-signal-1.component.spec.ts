import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputSignal1Component } from './output-signal-1.component';

describe('OutputSignal1Component', () => {
  let component: OutputSignal1Component;
  let fixture: ComponentFixture<OutputSignal1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputSignal1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputSignal1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
