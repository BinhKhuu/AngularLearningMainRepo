import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Panel2Component } from './panel2.component';

describe('Panel2Component', () => {
  let component: Panel2Component;
  let fixture: ComponentFixture<Panel2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Panel2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Panel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
