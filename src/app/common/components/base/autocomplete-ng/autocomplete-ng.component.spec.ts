import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteNgComponent } from './autocomplete-ng.component';
import { provideHttpClient } from '@angular/common/http';

describe('AutocompleteNgComponent', () => {
  let component: AutocompleteNgComponent;
  let fixture: ComponentFixture<AutocompleteNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteNgComponent],
      providers: [provideHttpClient()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AutocompleteNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
