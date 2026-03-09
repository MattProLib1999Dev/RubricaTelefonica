import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionNgComponent } from './accordion-ng.component';

describe('AccordionNgComponent', () => {
  let component: AccordionNgComponent;
  let fixture: ComponentFixture<AccordionNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
