import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBoxBaseComponent } from './list-box-base.component';

describe('ListBoxBaseComponent', () => {
  let component: ListBoxBaseComponent;
  let fixture: ComponentFixture<ListBoxBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBoxBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBoxBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
