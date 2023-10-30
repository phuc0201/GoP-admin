import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJourneysComponent } from './list-journeys.component';

describe('ListJourneysComponent', () => {
  let component: ListJourneysComponent;
  let fixture: ComponentFixture<ListJourneysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListJourneysComponent]
    });
    fixture = TestBed.createComponent(ListJourneysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
