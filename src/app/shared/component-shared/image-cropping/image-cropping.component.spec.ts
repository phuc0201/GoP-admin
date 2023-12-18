import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCroppingComponent } from './image-cropping.component';

describe('ImageCroppingComponent', () => {
  let component: ImageCroppingComponent;
  let fixture: ComponentFixture<ImageCroppingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageCroppingComponent]
    });
    fixture = TestBed.createComponent(ImageCroppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
