import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page5',
  imports: [RouterLink],
  templateUrl: './page5.component.html',
  styleUrl: './page5.component.scss'
})
export class Page5Component {
  activeZone: number | null = 1;

  showText(zone: number) {
    this.activeZone = zone;
  }
}