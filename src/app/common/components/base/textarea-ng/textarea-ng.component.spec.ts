import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaNgComponent } from './textarea-ng.component';

describe('TextareaNgComponent', () => {
  let component: TextareaNgComponent;
  let fixture: ComponentFixture<TextareaNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextareaNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
