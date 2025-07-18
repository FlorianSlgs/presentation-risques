import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-types-risques-feux',
  templateUrl: './types-risques.component.html',
  imports: [
    CommonModule,
  ],
})
export class TypesRisquesFeuxComponent {
  selectedTab = 0;
  tabs = [
    {
      label: 'Feu de forêt',
      image: 'assets/images/jpg/feux_foret.png',
      content: "C'est un incendie qui atteint des bois, forêts, landes, garrigues, maquis et reboisements. C’est un feu qui impacte un massif dont la surface, d’un seul tenant, est supérieure à 0,5 ha, quelle que soit la superficie de forêt brûlée.",
      content1 : '',
    },
    {
      label: "Aggravation",
      image: 'assets/images/jpg/feux1.jpg',
      content: 'L’augmentation des surfaces en bois et landes et de leur biomasse, l’extension des zones urbanisées au contact des zones naturelles boisées, combinées au réchauffement climatique, conduisent à une aggravation du risque incendie de forêt.',
      content1: '',
    },
    {
      label: 'Exposition',
      image: 'assets/images/jpg/feux2.jpg',
      content: 'Parmi les départements de la région Occitanie, l’Hérault est le plus exposé aux feux de forêt. Les zones les plus critiques correspondent aux forêts de pins d’Alep et aux garrigues, qui s’étendent du Minervois au Lunellois.',
      content1: 'C’est également le secteur où se développe principalement l’urbanisation, avec d’importantes interfaces forêt – habitat.',
    },
    {
      label: 'Témoignage',
      image: 'assets/images/jpg/feux3.jpg',
      content: '"Tout est brûlé à moins de 80 mètres de mon jardin et ma maison a été sauvée..." (Une habitante d’Aumelas, juillet 2022, Midi Libre)',
      content1: ''
    }
  ];
}