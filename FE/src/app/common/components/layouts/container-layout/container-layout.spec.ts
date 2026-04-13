import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerLayout } from './container-layout';

describe('ContainerLayout', () => {
  let component: ContainerLayout;
  let fixture: ComponentFixture<ContainerLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
