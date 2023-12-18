import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';

const plugins = [
  CommonModule,
  NzButtonModule,
  NzGridModule,
  ImageCropperModule,
];

@Component({
  selector: 'app-image-cropping',
  templateUrl: './image-cropping.component.html',
  styleUrls: ['./image-cropping.component.scss'],
  standalone: true,
  imports: plugins,
})
export class ImageCroppingComponent implements OnInit {
  @Input() maintainAspectRatio: boolean = false;
  @Output() outpuFile = new EventEmitter<Blob | null>();
  imageChangedEvent: unknown;
  croppedImage: ImageCroppedEvent | null = null;
  errLowQualityPicInput = false;
  errMaxQualityPicInput = false;
  isSelectedFile = false;
  aspectRatioNumber = 1;
  rotateCanvas = 0;

  fileChangeEvent(event: unknown): void {
    this.imageChangedEvent = event;
    this.isSelectedFile = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event;
  }

  loadImageFailed() {
    alert('error');
  }

  rotateLeft() {
    this.rotateCanvas = (this.rotateCanvas + 3) % 4;
  }

  rotateRight() {
    this.rotateCanvas = (this.rotateCanvas + 5) % 4;
  }

  onSubmit() {
    if (this.croppedImage?.blob) {
      this.outpuFile.emit(this.croppedImage.blob);
    } else {
      alert('error');
    }
  }

  onCancel() {
    this.outpuFile.emit(null);
  }

  ngOnInit(): void {

  }

  constructor(

  ) { }

}
