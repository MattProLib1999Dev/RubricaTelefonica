import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectNgComponent } from './select-ng.component';

describe('SelectNgComponent', () => {
  let component: SelectNgComponent;
  let fixture: ComponentFixture<SelectNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
