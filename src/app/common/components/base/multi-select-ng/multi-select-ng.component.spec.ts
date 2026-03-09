import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectNgComponent } from './multi-select-ng.component';
import { provideHttpClient } from '@angular/common/http';

describe('MultiSelectNgComponent', () => {
  let component: MultiSelectNgComponent;
  let fixture: ComponentFixture<MultiSelectNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectNgComponent],
      providers: [provideHttpClient()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MultiSelectNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
