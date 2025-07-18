import { Component } from '@angular/core';


@Component({
  selector: 'app-papi',
  standalone: true,
  imports: [],
  templateUrl: './papi.component.html',
  styleUrl: './papi.component.scss'
})
export class PAPIComponent {
  activeZone: number | null = 1;

  showText(zone: number) {
    this.activeZone = zone;
  }
}