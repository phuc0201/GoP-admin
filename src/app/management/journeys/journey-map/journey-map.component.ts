import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

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
export class JourneyMapComponent implements OnInit, OnDestroy {
  private map!: L.Map;
  private initMap(): void {
    this.map = L.map('journey-map').setView([10.850580, 106.771806], 10);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    });
    tiles.addTo(this.map);

  }
  ngOnInit(): void {
    this.initMap();
    let marker = L.marker([28.2380, 83.9956], { icon: carIcon }).addTo(this.map);
    marker.setLatLng([10.850580, 106.771806]);
    L.Marker.prototype.options.icon = customIcon;
    L.Routing.control({
      waypoints: [L.latLng(10.850580, 106.771806), L.latLng(10.857601, 106.763528)],
      routeWhileDragging: true,
    })
    .addTo(this.map);
  }
  ngOnDestroy(): void {
    this.map.remove();
  }
}
