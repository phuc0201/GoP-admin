import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementLayoutComponent } from './management-layout.component';

describe('ManagementLayoutComponent', () => {
  let component: ManagementLayoutComponent;
  let fixture: ComponentFixture<ManagementLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementLayoutComponent]
    });
    fixture = TestBed.createComponent(ManagementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
