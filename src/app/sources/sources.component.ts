import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Source {
  id: number;
  title: string;
  url: string;
  publishDate: string;
}

@Component({
  selector: 'app-sources',
  imports: [CommonModule],
  templateUrl: './sources.component.html',
  standalone: true
})
export class SourcesComponent {
  sources: Source[] = [
    {
      id: 1,
      title: "Dossier départemental des risques majeurs - DDRM",
      url: "https://www.herault.gouv.fr/Actions-de-l-Etat/Environnement-eau-chasse-risques-naturels-et-technologiques/Risques-naturels-et-technologiques/Dossier-departemental-des-risques-majeurs/Dossier-departemental-des-risques-majeurs-DDRM",
      publishDate: "2022-05-23"
    },
    {
      id: 2,
      title: "TOUS RÉSILIENTS FACE AUX RISQUES NATURELS DANS L’HÉRAULT",
      url: "https://www.herault.gouv.fr/Publications/Etudes-Cartes-Donnees/Risques/TOUS-RESILIENTS-FACE-AUX-RISQUES-NATURELS-DANS-L-HERAULT",
      publishDate: "2023-10-12"
    },
    {
      id: 3,
      title: "Georisques",
      url: "https://www.georisques.gouv.fr/",
      publishDate: ""
    },
    {
      id: 4,
      title: "CCR – Caisse Centrale de Réassurance",
      url: "https://www.ccr.fr/",
      publishDate: ""
    }
  ];
}