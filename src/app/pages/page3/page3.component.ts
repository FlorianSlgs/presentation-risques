import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesRisquesMouvementComponent } from './types-risques/types-risques.component';
import { ConsequencesMouvementComponent } from "./consequences/consequences.component";
import { ActionsPreventionMouvementComponent } from './actions-prevention/actions-prevention.component';
import { SituationMouvementComponent } from './situation/situation.component';

@Component({
  selector: 'app-page3',
  standalone: true,
  imports: [CommonModule, TypesRisquesMouvementComponent, ConsequencesMouvementComponent, ActionsPreventionMouvementComponent, SituationMouvementComponent],
  templateUrl:"page3.component.html"
})
export class Page3Component {
  
  showMore = false;

  cards = [
    "Informations",
    "Situation",
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

  touchStartX = 0;

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].screenX;
    const deltaX = touchEndX - this.touchStartX;
    if (Math.abs(deltaX) > 40) { // seuil pour éviter les petits mouvements
      if (deltaX < 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

}