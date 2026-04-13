import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeNgComponent } from './badge-ng.component';

describe('BadgeNgComponent', () => {
  let component: BadgeNgComponent;
  let fixture: ComponentFixture<BadgeNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgeNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
