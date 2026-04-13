import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNgComponent } from './modal-ng.component';
import { BehaviorSubject } from 'rxjs';

describe('ModalNgComponent', () => {
  let component: ModalNgComponent;
  let fixture: ComponentFixture<ModalNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNgComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hide modal', () => {
    let bh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    component.command = bh;

    bh.next(true);
    bh.next(false);

  });
});
