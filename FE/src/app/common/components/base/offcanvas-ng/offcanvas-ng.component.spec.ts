import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvasNgComponent } from './offcanvas-ng.component';

describe('OffcanvasNgComponent', () => {
  let component: OffcanvasNgComponent;
  let fixture: ComponentFixture<OffcanvasNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffcanvasNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffcanvasNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
