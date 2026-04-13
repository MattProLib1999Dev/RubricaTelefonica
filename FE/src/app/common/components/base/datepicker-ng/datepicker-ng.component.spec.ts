import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerNgComponent } from './datepicker-ng.component';


describe('DatePickerNgComponent', () => {
  type NewType = DatePickerNgComponent;

  let component: NewType;
  let fixture: ComponentFixture<DatePickerNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
