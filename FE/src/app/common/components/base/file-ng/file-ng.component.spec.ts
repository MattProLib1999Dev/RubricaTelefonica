import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileNgComponent } from './file-ng.component';

describe('FileNgComponent', () => {
  let component: FileNgComponent;
  let fixture: ComponentFixture<FileNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
