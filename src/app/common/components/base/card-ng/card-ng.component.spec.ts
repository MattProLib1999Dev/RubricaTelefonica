import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNgComponent } from './card-ng.component';

describe('CardNgComponent', () => {
  let component: CardNgComponent;
  let fixture: ComponentFixture<CardNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
