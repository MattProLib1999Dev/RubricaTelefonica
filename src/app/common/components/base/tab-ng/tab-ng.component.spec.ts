import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabNgComponent } from './tab-ng.component';

describe('TabNgComponent', () => {
  let component: TabNgComponent;
  let fixture: ComponentFixture<TabNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabNgComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TabNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.index = 1;
    expect(component.currentIndex).toEqual(1);
  });
});
