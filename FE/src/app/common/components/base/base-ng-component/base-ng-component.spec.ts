import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseNgComponent } from './base-ng-component';

describe('BaseNgComponent', () => {
  let component: BaseNgComponent;
  let fixture: ComponentFixture<BaseNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
