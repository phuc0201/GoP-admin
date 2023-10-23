import { Component } from '@angular/core';

@Component({
  selector: 'app-journeys',
  templateUrl: './journeys.component.html',
  styleUrls: ['./journeys.component.scss']
})
export class JourneysComponent {
  display: any;
  center: google.maps.LatLngLiteral = {
      lat: 10.858326536133312,
      lng: 106.5852677822113
  };
  zoom = 6;

  moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }
}
