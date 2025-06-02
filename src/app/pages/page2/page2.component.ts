// src/app/pages/gestion-risques/gestion-risques.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../section.model';

@Component({
  selector: 'app-page2',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-600 to-green-800 text-white">
      <div class="text-center max-w-4xl mx-auto px-6">
        <h2 class="text-5xl font-bold mb-8">{{ title }}</h2>
        <div class="space-y-6">
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 class="text-3xl font-semibold mb-6">Processus de gestion</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div *ngFor="let step of managementSteps; let i = index" class="text-center">
                <div class="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <span class="text-2xl font-bold">{{ i + 1 }}</span>
                </div>
                <p>{{ step }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class Page2Component implements SectionComponent {
  title = 'Gestion des Risques';
  id = 'gestion';

  managementSteps = [
    'Identification',
    'Évaluation',
    'Traitement',
    'Surveillance'
  ];
}