import { SectionComponent } from './../../section.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./accueil.component.html",
})
export class AccueilComponent implements SectionComponent {
  title = 'Présentation des Risques';
  id = 'intro';
  
  @Output() nextSection = new EventEmitter<void>();

  onNext() {
    this.nextSection.emit();
  }
}