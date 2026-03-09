import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxNgComponent } from './textbox-ng.component';

describe('TextboxNgComponent', () => {
  let component: TextboxNgComponent;
  let fixture: ComponentFixture<TextboxNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextboxNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextboxNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
