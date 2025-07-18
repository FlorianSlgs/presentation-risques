import { Component } from '@angular/core';


@Component({
  selector: 'app-ppri',
  imports: [],
  templateUrl: './ppri.component.html',
  styleUrl: './ppri.component.scss'
})
export class PPRIComponent {
  activeZone: number | null = 1;

  showText(zone: number) {
    this.activeZone = zone;
  }
}
