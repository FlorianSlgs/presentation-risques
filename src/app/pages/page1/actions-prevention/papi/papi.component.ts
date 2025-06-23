import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-papi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './papi.component.html',
  styleUrl: './papi.component.scss'
})
export class PAPIComponent {
  activeZone: number | null = null;

  showText(zone: number) {
    this.activeZone = zone;
  }
}