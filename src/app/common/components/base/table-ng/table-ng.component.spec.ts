import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableNgComponent } from './table-ng.component';
import { provideHttpClient } from '@angular/common/http';


describe('TableNgComponent', () => {
  let component: TableNgComponent<any>;
  let fixture: ComponentFixture<TableNgComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableNgComponent],
      providers: [provideHttpClient()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TableNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



});
