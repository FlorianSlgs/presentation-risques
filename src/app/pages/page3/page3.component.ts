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