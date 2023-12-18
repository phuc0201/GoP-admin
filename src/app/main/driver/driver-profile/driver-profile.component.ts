import { Component, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { IDriver, IDriverImageDTO } from 'src/app/core/model/management/driver.model';
import { FileService } from 'src/app/core/services/common/file.service';
import { DriverService } from 'src/app/core/services/management/driver.service';

export interface profileImage {
  label_front: string,
  label_back: string,
  typeImageFront: string,
  typeImageBack: string,
  imageFront: Blob | null,
  imageBack: Blob | null;
  imageLinkFront?: string,
  imageLinkBack?: string;
}

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.scss']
})
export class DriverProfileComponent implements OnChanges, OnInit {
  modalRef!: NzModalRef;
  typeImage: string = '';
  driverProfile?: profileImage[];
  vehicleImage: Blob | null = null;
  avatarImage: Blob | null = null;
  cavetImageF: Blob | null = null;
  cavetImageB: Blob | null = null;
  identificationImageF: Blob | null = null;
  identificationImageB: Blob | null = null;
  licenseImageF: Blob | null = null;
  licenseImageB: Blob | null = null;
  imgProfile: IDriverImageDTO = {};
  isChangeImg: boolean = false;
  isChangeImgAvatar: boolean = false;
  isChangeImgVehicle: boolean = false;
  isChangeImgIdenF: boolean = false;
  isChangeImgIdenB: boolean = false;
  isChangeImgCavetF: boolean = false;
  isChangeImgCabvetB: boolean = false;
  isChangeImgLicenseF: boolean = false;
  isChangeImgLicenseB: boolean = false;
  driverInfor?: IDriver;
  initProfileImage(): void {
    this.driverProfile = [
      {
        label_front: 'Ảnh CCCD mặt trước',
        label_back: 'Ảnh CCCD mặt sau',
        typeImageFront: 'identification_card_f',
        typeImageBack: 'identification_card_b',
        imageFront: this.identificationImageF,
        imageBack: this.identificationImageB,
        imageLinkFront: this.driverInfor?.identification_card_f,
        imageLinkBack: this.driverInfor?.identification_card_b
      },
      {
        label_front: 'Ảnh cavet xe mặt trước',
        label_back: 'Ảnh cavet xe mặt sau',
        typeImageFront: 'cavet_f',
        typeImageBack: 'cavet_b',
        imageFront: this.cavetImageF,
        imageBack: this.cavetImageB,
        imageLinkFront: this.driverInfor?.Cavet_f,
        imageLinkBack: this.driverInfor?.Cavet_b
      },
      {
        label_front: 'Ảnh giấy phép xe mặt trước',
        label_back: 'Ảnh giấy phép xe mặt sau',
        typeImageFront: 'license_image_f',
        typeImageBack: 'license_image_b',
        imageFront: this.licenseImageF,
        imageBack: this.licenseImageB,
        imageLinkFront: this.driverInfor?.license_image_f,
        imageLinkBack: this.driverInfor?.license_image_b
      }
    ];
  }

  loadImg(): void {
    this.driverSvc.getDriverInfor().subscribe({
      next: res => {
        if (res) {
          this.driverInfor = res;
          this.initProfileImage();
        }
      },
      error: () => {
        this.toast.error({ detail: "ERROR", summary: 'Lấy thông tin tài xế thất bại', duration: 2000, position: 'topRight' });
      }
    });
  }

  openCropImgModal(tpl: TemplateRef<unknown>, type?: string) {
    this.typeImage = type ?? '';
    this.modalRef = this.nzModalSvc.create({
      nzTitle: 'Upload ' + this.typeImage,
      nzContent: tpl,
      nzWidth: 700,
      nzFooter: null,
    });
  }

  closeCropImgModal(img: Blob | null) {
    if (img) {
      this.isChangeImg = true;

      this.avatarImage = this.typeImage === 'avatar' ? img : this.avatarImage;
      this.vehicleImage = this.typeImage === 'vehicle' ? img : this.vehicleImage;

      this.identificationImageF = this.typeImage === 'identification_card_f' ? img : this.identificationImageF;
      this.identificationImageB = this.typeImage === 'identification_card_b' ? img : this.identificationImageB;

      this.cavetImageF = this.typeImage === 'cavet_f' ? img : this.cavetImageF;
      this.cavetImageB = this.typeImage === 'cavet_b' ? img : this.cavetImageB;

      this.licenseImageF = this.typeImage === 'license_image_f' ? img : this.licenseImageF;
      this.licenseImageB = this.typeImage === 'license_image_b' ? img : this.licenseImageB;

      this.initProfileImage();
    }
    this.modalRef.close();
  }

  onSubmit(): void {
    const formData = new FormData();
    if (this.isChangeImg) {
      this.isChangeImg = false;
      if (this.avatarImage) {
        const fileImg = this.fileSvc.blobToFile(this.avatarImage, `avatar-${Date.now()}.png`);
        this.imgProfile.avatar = fileImg;
        formData.append('avatar', fileImg);
      }
      if (this.vehicleImage) {
        const fileImg = this.fileSvc.blobToFile(this.vehicleImage, `vehicle-${Date.now()}.png`);
        formData.append('vehicleImage', fileImg);
      }
      if (this.identificationImageF) {
        const fileImg = this.fileSvc.blobToFile(this.identificationImageF, `identification_card_f-${Date.now()}.png`);
        formData.append('identification_card_f', fileImg);
      }
      if (this.identificationImageB) {
        const fileImg = this.fileSvc.blobToFile(this.identificationImageB, `identification_card_b-${Date.now()}.png`);
        formData.append('identification_card_b', fileImg);
      }
      if (this.cavetImageF) {
        const fileImg = this.fileSvc.blobToFile(this.cavetImageF, `Cavet_f-${Date.now()}.png`);
        formData.append('Cavet_f', fileImg);
      }
      if (this.cavetImageB) {
        const fileImg = this.fileSvc.blobToFile(this.cavetImageB, `Cavet_b-${Date.now()}.png`);
        formData.append('Cavet_b', fileImg);
      }

      if (this.licenseImageF) {
        const fileImg = this.fileSvc.blobToFile(this.licenseImageF, `license_image_f-${Date.now()}.png`);
        formData.append('license_image_f', fileImg);
      }
      if (this.licenseImageB) {
        this.isChangeImgLicenseB = false;
        const fileImg = this.fileSvc.blobToFile(this.licenseImageB, `license_image_b-${Date.now()}.png`);
        formData.append('license_image_b', fileImg);
      }

      this.driverSvc.updateImageProfile(formData).subscribe({
        next: res => {
          if (res) {
            this.toast.success({ detail: "SUCCESS", summary: 'Cập nhật hồ sơ thành công', duration: 2000, position: 'topRight' });
          }
        },
        error: err => {
          this.toast.error({ detail: "ERROR", summary: 'Cập nhật hồ sơ thất bại', duration: 2000, position: 'topRight' });
        }
      });
    }
    else {
      this.toast.warning({ detail: "WARNING", summary: 'Chưa có sự thay đổi nào', duration: 2000, position: 'topRight' });
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.vehicleImage = null;
    this.avatarImage = null;
    this.cavetImageF = null;
    this.cavetImageB = null;
    this.identificationImageF = null;
    this.identificationImageB = null;
    this.licenseImageF = null;
    this.licenseImageB = null;
    this.loadImg();
  }

  constructor(
    private nzModalSvc: NzModalService,
    private fileSvc: FileService,
    private driverSvc: DriverService,
    private toast: NgToastService
  ) { }
}


