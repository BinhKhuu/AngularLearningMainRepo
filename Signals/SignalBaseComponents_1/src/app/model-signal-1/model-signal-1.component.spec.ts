import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSignal1Component } from './model-signal-1.component';

describe('ModelSignal1Component', () => {
  let component: ModelSignal1Component;
  let fixture: ComponentFixture<ModelSignal1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelSignal1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelSignal1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
