import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementSidebarComponent } from './management-sidebar.component';

describe('ManagementSidebarComponent', () => {
  let component: ManagementSidebarComponent;
  let fixture: ComponentFixture<ManagementSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementSidebarComponent]
    });
    fixture = TestBed.createComponent(ManagementSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
