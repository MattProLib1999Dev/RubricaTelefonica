import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartNgComponent } from './chart-ng.component';

describe('ChartNgComponent', () => {
  let component: ChartNgComponent;
  let fixture: ComponentFixture<ChartNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
