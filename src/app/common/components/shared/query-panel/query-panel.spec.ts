import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryPanelComponent } from './query-panel';

describe('QueryPanelComponent', () => {
  let component: QueryPanelComponent;
  let fixture: ComponentFixture<QueryPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QueryPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
