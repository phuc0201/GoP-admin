import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy{
  private map!: L.Map;
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 10.7769 , 106.7009 ],
      zoom: 18
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    });

    tiles.addTo(this.map);
  }

  ngOnInit(): void {
    this.initMap();
  }
  ngOnDestroy(): void {
    this.map.remove();
  }
}
