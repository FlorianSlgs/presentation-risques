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