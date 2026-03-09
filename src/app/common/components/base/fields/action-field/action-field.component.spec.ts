import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFieldComponent } from './action-field.component';

describe('ActionFieldComponent', () => {
  let component: ActionFieldComponent;
  let fixture: ComponentFixture<ActionFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionFieldComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActionFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.command.subscribe(res => {
      expect(res.commandName).toBe("TEST");
    });
    component.onClick("TEST");
    expect(component).toBeTruthy();
  });
});
