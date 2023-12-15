import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { ILocation } from 'src/app/core/model/management/location.model';

const customIcon = L.icon({
  iconUrl: 'assets/img/pin.png', // Đường dẫn đến biểu tượng
  iconSize: [32, 32], // Kích thước của biểu tượng
  iconAnchor: [16, 32], // Vị trí neo của biểu tượng
});
const carIcon = L.icon({
  iconUrl: 'assets/img/taxi.png', // Đường dẫn đến biểu tượng
  iconSize: [32, 32], // Kích thước của biểu tượng
  iconAnchor: [16, 16], // Vị trí neo của biểu tượng
});
@Component({
  selector: 'app-journey-map',
  templateUrl: './journey-map.component.html',
  styleUrls: ['./journey-map.component.scss']
})
export class JourneyMapComponent implements OnInit, OnDestroy, OnChanges {
  @Input() src_location?: ILocation;
  @Input() des_location?: ILocation;
  @Output() totalTime = new EventEmitter<number>();
  @Output() distance = new EventEmitter<number>();
  waypoints: any[] = [];
  tripID: string = '';
  private map!: L.Map;
  private initMap(): void {
    if (this.map)
      this.map.remove();
    this.map = L.map('journey-map').setView([10.850580, 106.771806], 10);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    });
    tiles.addTo(this.map);
    let marker = L.marker([10.850580, 106.771806], { icon: carIcon }).addTo(this.map);
    if (this.src_location && this.des_location) {
      marker.setLatLng([this.src_location.lat, this.src_location.long]);
      this.waypoints = [L.latLng(this.src_location.lat, this.src_location.long), L.latLng(this.des_location.lat, this.des_location.long)];
      L.Marker.prototype.options.icon = customIcon;
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
        show: false
      }).on('routesfound', (e) => {
        let routes = e.routes;
        let speed = 40; //km/h
        let distance = routes[0].summary.totalDistance;
        let time = ((distance / 1000) / speed) * 60;
        this.totalTime.emit(time);
        this.distance.emit(distance);
      })
        .addTo(this.map);
    }
  }

  ngOnInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    // this.map.remove();
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.tripID = params['id'];
    });
  }
}

