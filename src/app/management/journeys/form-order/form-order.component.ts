import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { NgToastService } from 'ng-angular-popup';
import { MakeForm } from 'src/app/core/model/common/make-form.model';
import { IOrderDTO, IOrderFormDTO } from 'src/app/core/model/management/order.model';
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
  order?: IOrderDTO;
  form!: FormGroup<MakeForm<IOrderFormDTO>>;
  map!: L.Map;

  createForm(): void {
    this.form = this.fb.nonNullable.group({
      userPhoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), this.startsWithZeroValidator()]],
      source_address: ['', [Validators.required, Validators.minLength(10)]],
      destination_address: ['', [Validators.required, Validators.minLength(10)]],
      source_location_lat: ['', [Validators.required, this.isNumber]],
      source_location_long: ['', [Validators.required, this.isNumber]], destination_location_lat: ['', [Validators.required, this.isNumber]],
      destination_location_long: ['', [Validators.required, this.isNumber]],
    });
  }

  isNumber(control: AbstractControl): ValidationErrors | null {
    if (!isNaN(Number(control.value))) {
      return null;
    }
    return { notANumber: 'The value is not a number' };
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
      this.progress = 0;
      let userPhoneNumber = '+84' + this.form.value.userPhoneNumber ?? 'admin';
      let source_location_lat = this.form.value.source_location_lat ?? '0';
      let source_location_long = this.form.value.source_location_long ?? '0';

      let destination_location_lat = this.form.value.destination_location_lat ?? '0';
      let destination_location_long = this.form.value.destination_location_long ?? '0';
      let source = L.latLng(parseFloat(source_location_lat), parseFloat(source_location_long));
      let destination = L.latLng(parseFloat(destination_location_lat), parseFloat(destination_location_long));
      let distance = source.distanceTo(destination);
      let speed = 40; // km/h
      let duration = parseFloat((distance / (speed * (1000 / 3600))).toFixed(2));

      if (this.map)
        this.map.remove();
      this.map = L.map('getDistanceBasedOnMap').setView([10.850580, 106.771806], 10);
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
      });
      tiles.addTo(this.map);
      let waypoints = [L.latLng(parseFloat(source_location_lat), parseFloat(source_location_long)), L.latLng(parseFloat(destination_location_lat), parseFloat(destination_location_long))];
      L.Routing.control({
        waypoints: waypoints,
        plan: L.Routing.plan(waypoints, {
          createMarker: function (i, wp) {
            return L.marker(wp.latLng, {
              draggable: false
            });
          }
        }),
      })
        .on('routesfound', (e) => {
          let routes = e.routes;
          let speed = 40; //km/h
          let distance = routes[0].summary.totalDistance;
          let time = parseFloat((distance / (speed * (1000 / 3600))).toFixed(2));

          this.order = {
            user: userPhoneNumber,
            source_address: this.form.value.source_address ?? '',
            destination_address: this.form.value.destination_address ?? '',
            orderTotal: parseFloat((parseFloat((distance / 1000).toFixed(2)) * 5000).toFixed(2)),
            distance: parseFloat((distance).toFixed(2)),
            duration: time,
            source_location: {
              lat: parseFloat(source_location_lat),
              long: parseFloat(source_location_long)
            },
            destination_location: {
              lat: parseFloat(destination_location_lat),
              long: parseFloat(destination_location_long)
            }
          };

          this.createOrder(this.order);

        }).addTo(this.map);
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
  ) { }

}
