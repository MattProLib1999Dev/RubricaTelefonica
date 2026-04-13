import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckNgComponent } from './check-ng.component';

describe('CheckNgComponent', () => {
  let component: CheckNgComponent;
  let fixture: ComponentFixture<CheckNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    component.enableButton = false;
    expect(component.buttonClass).toBe("");

    component.enableButton = true;
    component.outlineButton = true;
    expect(component.buttonClass).toBe("btn-outline-primary");

    component.enableButton = true;
    component.outlineButton = false;
    expect(component.buttonClass).toBe("btn-primary");
  });
});
