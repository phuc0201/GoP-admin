import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { NgToastService } from 'ng-angular-popup';
import { MakeForm } from 'src/app/core/model/common/make-form.model';
import { IAddress, IAddressDetail } from 'src/app/core/model/management/address.model';
import { IOrderDTO, IOrderFormDTO } from 'src/app/core/model/management/order.model';
import { IRoutesSummary } from 'src/app/core/model/management/routes-summary.model';
import { Vehicle } from 'src/app/core/model/management/vehicle.model';
import { MapService } from 'src/app/core/services/management/map.service';
import { OrderService } from 'src/app/core/services/management/order.service';

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.scss']
})
export class FormOrderComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<boolean>();
  progress: number = 100;
  order!: IOrderDTO;
  form!: FormGroup<MakeForm<IOrderFormDTO>>;
  map!: L.Map;
  timeoutId: any;
  srcAddress: IAddress = {
    features: []
  };
  desAddress: IAddress = {
    features: []
  };
  srcAddressDetail: IAddressDetail = {
    geometry: {
      coordinates: []
    },
    properties: {
      name: ''
    }
  };
  desAddressDetail: IAddressDetail = {
    geometry: {
      coordinates: []
    },
    properties: {
      name: ''
    }
  };
  routesSummary?: IRoutesSummary;
  nzFilterOption = (): boolean => true;
  selectedSrcValue = null;
  selectedDesValue = null;
  duration: number = 1;
  distance: number = 1;
  searchSrcAddress(value: string): void {
    this.srcAddress.features = [];
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      if (value !== '') {
        this.mapSvc.searchAddress(value).subscribe({
          next: res => {
            this.srcAddress = res;
          },
          error: err => {
            this.toast.error({ detail: "ERROR", summary: 'Location not found', duration: 2000, position: 'topRight' });
          }
        });
      }
    }, 300);
  }

  searchDesAddress(value: string): void {
    this.desAddress.features = [];
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      if (value !== '') {
        this.mapSvc.searchAddress(value).subscribe({
          next: res => {
            this.desAddress = res;
          },
          error: err => {
            this.toast.error({ detail: "ERROR", summary: 'Location not found', duration: 2000, position: 'topRight' });
          }
        });
      }
    }, 300);
  }

  createForm(): void {
    this.form = this.fb.nonNullable.group({
      userPhoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), this.startsWithZeroValidator()]],
      source_address: [this.srcAddressDetail, [Validators.required, this.addressValidator()]],
      destination_address: [this.desAddressDetail, [Validators.required, this.addressValidator()]],
      vehicle_type: ['bike', [Validators.required]],
    });
  }

  isNumber(control: AbstractControl): ValidationErrors | null {
    if (!isNaN(Number(control.value))) {
      return null;
    }
    return { notANumber: 'The value is not a number' };
  }

  addressValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any; } | null => {
      const invalid = !control.value || !control.value.geometry || !control.value.geometry.coordinates || control.value.geometry.coordinates.length !== 2;
      return invalid ? { value: control.value } : null;
    };
  }

  startsWithZeroValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any; } | null => {
      const startsWithZero = control.value.startsWith('0');
      return startsWithZero ? { 'startsWithZero': { value: control.value } } : null;
    };
  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit(true);
  }

  submitForm(): void {
    if (this.form.valid) {
      this.mapSvc.calculateDistance([this.form.value.source_address?.geometry.coordinates[0] ?? 0, this.form.value.source_address?.geometry.coordinates[1] ?? 0],
        [this.form.value.destination_address?.geometry.coordinates[0] ?? 0, this.form.value.destination_address?.geometry.coordinates[1] ?? 0]).subscribe({
          next: res => {
            this.duration = Math.ceil(res.routes[0].summary.duration);
            this.distance = Math.ceil(res.routes[0].summary.distance);
          },
          complete: () => {
            this.order = {
              user: '+84' + this.form.value.userPhoneNumber,
              source_address: this.form.value.source_address?.properties.name ?? '',
              destination_address: this.form.value.destination_address?.properties.name ?? '',
              source_location: {
                lat: this.form.value.source_address?.geometry.coordinates[1] ?? 0,
                long: this.form.value.source_address?.geometry.coordinates[0] ?? 0
              },
              destination_location: {
                lat: this.form.value.destination_address?.geometry.coordinates[1] ?? 0,
                long: this.form.value.destination_address?.geometry.coordinates[0] ?? 0
              },
              distance: this.distance,
              duration: this.duration,
              vehicle_type: this.form.value.vehicle_type ?? 'bike',
              orderTotal: this.form.value.vehicle_type === Vehicle.BIKE ? Math.ceil((this.distance / 1000) * 6000) * 1.1 : Math.ceil((this.distance / 1000) * 6000) * 1.4
            };
            this.createOrder(this.order);
          },
          error: err => {
            this.toast.error({ detail: "ERROR", summary: 'Get distance and duration failed', duration: 3000, position: 'topRight' });
          }
        });
    }
    else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  createOrder(order: IOrderDTO) {
    this.orderSvc.createOrder(order).subscribe({
      next: res => {
        if (res) {
          this.toast.success({ detail: "SUCCESS", summary: 'Tạo đơn hàng thành công', duration: 3000, position: 'topRight' });
        }
      },
      error: err => {
        this.toast.error({ detail: "ERROR", summary: 'Tạo đơn hàng thất bại', duration: 3000, position: 'topRight' });
      },
      complete: () => {
        this.form.reset();
        this.progress = 100;
      }
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  constructor(
    private fb: FormBuilder,
    private orderSvc: OrderService,
    private toast: NgToastService,
    private mapSvc: MapService,
  ) { }

}
