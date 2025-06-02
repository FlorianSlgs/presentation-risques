// src/app/pages/conclusion/conclusion.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../section.model';

@Component({
  selector: 'app-page3',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-600 to-red-800 text-white">
      <div class="text-center max-w-4xl mx-auto px-6">
        <h2 class="text-5xl font-bold mb-8">{{ title }}</h2>
        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h3 class="text-3xl font-semibold mb-6">Points clés à retenir</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 class="text-xl font-semibold mb-3">Prévention</h4>
              <ul class="space-y-2">
                <li *ngFor="let item of prevention">• {{ item }}</li>
              </ul>
            </div>
            <div>
              <h4 class="text-xl font-semibold mb-3">Réaction</h4>
              <ul class="space-y-2">
                <li *ngFor="let item of reaction">• {{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class Page3Component implements SectionComponent {
  title = 'Conclusion';
  id = 'conclusion';

  prevention = [
    'Anticipation des risques',
    'Mise en place de contrôles',
    'Formation du personnel'
  ];

  reaction = [
    'Plan de continuité',
    'Gestion de crise',
    'Communication'
  ];
}