import { Component, Input } from '@angular/core';
import { IDriver } from 'src/app/core/model/management/driver.model';

@Component({
  selector: 'app-top-drivers',
  templateUrl: './top-drivers.component.html',
  styleUrls: ['./top-drivers.component.scss']
})
export class TopDriversComponent {
  @Input() topDrivers?: IDriver[];
}
