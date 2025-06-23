import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ppri',
  imports: [CommonModule],
  templateUrl: './ppri.component.html',
  styleUrl: './ppri.component.scss'
})
export class PPRIComponent {
  activeZone: number | null = 1;

  showText(zone: number) {
    this.activeZone = zone;
  }
}
