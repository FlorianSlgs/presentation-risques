// src/app/pages/types-risques/types-risques.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video/video.component';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [CommonModule, VideoComponent],
  templateUrl:"page1.component.html"
})
export class Page1Component {

  showMore = false;


cards = [
  "Vidéo",
  "Types d'inondation",
  "Conséquences",
  "Actions préventives"
];
current = 0;

prev() {
  this.current = (this.current - 1 + this.cards.length) % this.cards.length;
}

next() {
  this.current = (this.current + 1) % this.cards.length;
}

isVisible(index: number): boolean {
  // Affiche la carte centrale et ses voisines gauche/droite
  return (
    index === this.current ||
    index === (this.current + 1) % this.cards.length ||
    index === (this.current - 1 + this.cards.length) % this.cards.length
  );
}

getCardClass(index: number): string {
  if (index === this.current) {
    return 'z-20 scale-110 translate-x-0 rotate-y-0';
  }
  if (index === (this.current - 1 + this.cards.length) % this.cards.length) {
    return 'z-10 scale-95 -translate-x-40 rotate-y-[-30deg] opacity-80';
  }
  if (index === (this.current + 1) % this.cards.length) {
    return 'z-10 scale-95 translate-x-40 rotate-y-[30deg] opacity-80';
  }
  return 'hidden';
}

}