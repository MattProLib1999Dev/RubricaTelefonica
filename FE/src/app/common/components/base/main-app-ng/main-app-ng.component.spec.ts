import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAppNgComponent } from './main-app-ng.component';

describe('MainAppNgComponent', () => {
  let component: MainAppNgComponent;
  let fixture: ComponentFixture<MainAppNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainAppNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAppNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
