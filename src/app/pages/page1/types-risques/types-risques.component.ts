import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-types-risques',
  templateUrl: './types-risques.component.html',
  imports: [
    CommonModule,
  ],
})
export class TypesRisquesComponent {
  selectedTab = 0;
  tabs = [
    {
      label: 'Inondations',
      image: 'assets/images/svg/inondations.svg',
      content: 'Une inondation est une submersion temporaire de zones habituellement hors d’eau suite à des précipitations soutenues.',
      content1 : 'Le département de l’Hérault est particulièrement exposé aux épisodes méditerranéens communément appelés épisodes cévenols. Ils sont liés à des remontées d’air chaud et humide en provenance de la Méditerranée, susceptibles de produire des orages violents et de fortes pluies.',
    },
    {
      label: 'Débordement',
      image: 'assets/images/jpg/crue_compress.jpg',
      content: 'Le cours d’eau sort de son lit et vient inonder les lieux environnants de façon plus ou moins rapide. Le niveau du cours d’eau peut monter de plusieurs mètres en moins de 2 heures.',
      content1: 'Le débit est alors si puissant que 30 cm d’eau peuvent suffire pour emporter une voiture ! Parfois la décrue peut-être particulièrement longue et impacter le quotidien (coupure des routes, des réseaux électriques, du téléphone, etc.).',
    },
    {
      label: 'Rupture d’ouvrage',
      image: 'assets/images/jpg/Barrage_du_Salagou_compress.jpg',
      content: 'Des systèmes d’endiguement, des ouvrages hydrauliques ou encore des bassins de rétention sont susceptibles de connaître des défaillances (surverses, ruptures) dans certaines situations extrêmes.',
      content1: 'Par exemple si l’événement dépasse le niveau de protection pour lequel ils ont été conçus.',
    },
    {
      label: 'Ruissellement',
      image: 'assets/images/jpg/ruisselement-compress.jpg',
      content: 'L’imperméabilisation des sols, due à l’urbanisation croissante et à certaines pratiques agricoles, empêche l’eau de s’infiltrer correctement dans le sol.',
      content1: 'Les réseaux d’évacuation d’eaux pluviales sont alors rapidement saturés, les eaux de pluie empruntent les rues et forment des courants parfois dangereux avec des vitesses importantes combinées à des hauteurs d’eau variables.'
    }
  ];
}