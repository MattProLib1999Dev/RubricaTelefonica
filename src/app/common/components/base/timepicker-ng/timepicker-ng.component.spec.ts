import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePickerNgComponent } from './timepicker-ng.component';


describe('TimePickerNgComponent', () => {
  type NewType = TimePickerNgComponent;

  let component: NewType;
  let fixture: ComponentFixture<TimePickerNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimePickerNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimePickerNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
