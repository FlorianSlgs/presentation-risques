// src/app/pages/types-risques/types-risques.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../section.model';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800 text-white">
      <div class="text-center max-w-4xl mx-auto px-6">
        <h2 class="text-5xl font-bold mb-8">{{ title }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 class="text-2xl font-semibold mb-4">Types de risques</h3>
            <ul class="text-left space-y-2">
              <li *ngFor="let type of riskTypes">• {{ type }}</li>
            </ul>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 class="text-2xl font-semibold mb-4">Impact</h3>
            <ul class="text-left space-y-2">
              <li *ngFor="let impact of impacts">• {{ impact }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `
})
export class Page1Component implements SectionComponent {
  title = 'Types de Risques';
  id = 'types';

  riskTypes = [
    'Risques opérationnels',
    'Risques financiers',
    'Risques stratégiques',
    'Risques de conformité'
  ];

  impacts = [
    'Pertes financières',
    'Réputation',
    'Conformité réglementaire',
    'Continuité d\'activité'
  ];
}