import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldComponent } from './text-field.component';

describe('TextFieldComponent', () => {
  let component: TextFieldComponent;
  let fixture: ComponentFixture<TextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextFieldComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    component.data = { field: 'value' };
    component.boundField = 'field';
    
    expect(component.text).toBe("value");

    component.maxLength = 2;
    expect(component.text).toBe("va...");

    expect(component.uid.length).toBeGreaterThan(0);

    expect(component).toBeTruthy();
  });
});
