import { SectionComponent } from './../../section.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div class="text-center">
        <h1 class="text-6xl font-bold mb-6">{{ title }}</h1>
        <p class="text-xl max-w-2xl mx-auto">Bienvenue dans cette présentation sur les risques</p>
        <div class="mt-8">
          <button 
            (click)="onNext()"
            class="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-full transition-all duration-200">
            Commencer
          </button>
        </div>
      </div>
    </section>
  `
})
export class AccueilComponent implements SectionComponent {
  title = 'Présentation des Risques';
  id = 'intro';
  
  @Output() nextSection = new EventEmitter<void>();

  onNext() {
    this.nextSection.emit();
  }
}