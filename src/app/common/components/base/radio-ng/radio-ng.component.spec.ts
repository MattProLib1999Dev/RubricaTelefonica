import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioNgComponent } from './radio-ng.component';

describe('RadioNgComponent', () => {
  let component: RadioNgComponent;
  let fixture: ComponentFixture<RadioNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioNgComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RadioNgComponent);
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
