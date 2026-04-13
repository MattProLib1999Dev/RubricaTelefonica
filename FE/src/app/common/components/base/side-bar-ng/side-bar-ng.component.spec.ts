import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarNgComponent } from './side-bar-ng.component';

describe('SideBarNgComponent', () => {
  let component: SideBarNgComponent;
  let fixture: ComponentFixture<SideBarNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.currentUrl;
    expect(component).toBeTruthy();
  });
});
