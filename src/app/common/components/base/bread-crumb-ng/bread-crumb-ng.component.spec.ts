import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCrumbNgComponent } from './bread-crumb-ng.component';

describe('BreadCrumbNgComponent', () => {
  let component: BreadCrumbNgComponent;
  let fixture: ComponentFixture<BreadCrumbNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadCrumbNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadCrumbNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
