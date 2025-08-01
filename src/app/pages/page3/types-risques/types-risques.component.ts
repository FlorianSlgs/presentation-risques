import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-types-risques-mouvement',
  templateUrl: './types-risques.component.html',
  imports: [
    CommonModule,
  ],
})
export class TypesRisquesMouvementComponent {
  selectedTab = 0;
  tabs = [
    {
      label: 'Mouvements de terrain',
      image: 'assets/images/jpg/sismique_1.webp',
      content: "Ils correspondent aux déplacements de masses de terrain déstabilisées sous l’effet de la gravité, accentués par des phénomènes naturels (pluviométrie anormalement forte, séisme, etc.) ou par des actions humaines (déboisement, exploitation de matériaux, etc.).",
      content1 : '',
    },
    {
      label: "Volume",
      image: 'assets/images/jpg/sismique_2.webp',
      content: 'Les volumes mis en jeu peuvent être compris entre quelques m³ et des millions de m³. Les déplacements peuvent être lents (quelques mm par an) ou très rapides (quelques centaines de mètres par jour).',
      content1: '',
    }
  ];
}