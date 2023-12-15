import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { IOrder } from 'src/app/core/model/management/order.model';

const customIcon = L.icon({
  iconUrl: 'assets/img/pin.png', // Đường dẫn đến biểu tượng
  iconSize: [32, 32], // Kích thước của biểu tượng
  iconAnchor: [16, 32], // Vị trí neo của biểu tượng
});
const carIcon = L.icon({
  iconUrl: 'assets/img/taxi.png', // Đường dẫn đến biểu tượng
  iconSize: [70, 70], // Kích thước của biểu tượng
  iconAnchor: [20, 35], // Vị trí neo của biểu tượng
});
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() ordersInProgress?: IOrder[];
  map!: L.Map;
  waypoints: any[] = [];
  initMap(): void {
    if (this.map)
      this.map.remove();

    L.Marker.prototype.options.icon = customIcon;
    this.map = L.map('map').setView([10.850580, 106.771806], 10);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    });
    tiles.addTo(this.map);

    if (this.ordersInProgress && this.ordersInProgress.length > 0) {
      for (let trip of this.ordersInProgress) {
        let marker = L.marker([trip.source_location.lat, trip.source_location.long], { icon: carIcon }).addTo(this.map);

        marker.on('click', () => {
          this.router.navigateByUrl(`/administration/dashboard/driver-details/trips/details?id=${trip.id}`);
        });

        this.waypoints = [
          L.latLng(trip.source_location.lat, trip.source_location.long),
          L.latLng(trip.destination_location.lat, trip.destination_location.long)
        ];
        L.Routing.control({
          waypoints: this.waypoints,
          plan: L.Routing.plan(this.waypoints, {
            createMarker: function (i, wp) {
              return L.marker(wp.latLng, {
                draggable: false
              });
            }
          }),
          addWaypoints: false,
          routeWhileDragging: false,
          show: false,

        }).addTo(this.map);
      }
    }
  }

  ngOnInit(): void {
    this.initMap();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    this.map.remove();
  }

  constructor(
    private router: Router
  ) { }
}
