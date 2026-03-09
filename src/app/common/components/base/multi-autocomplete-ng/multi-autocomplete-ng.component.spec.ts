import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiAutocompleteNgComponent } from './multi-autocomplete-ng.component';
import { provideHttpClient } from '@angular/common/http';

describe('MultiAutocompleteNgComponent', () => {
  let component: MultiAutocompleteNgComponent;
  let fixture: ComponentFixture<MultiAutocompleteNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiAutocompleteNgComponent],
      providers: [provideHttpClient()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MultiAutocompleteNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
