import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actions-prevention-mouvement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actions-prevention.component.html',
  styleUrls: ['./actions-prevention.component.scss']
})
export class ActionsPreventionMouvementComponent {
  selectedTab = 0;
    tabs = [
      {
        label: 'Actions collectives',
        image: 'assets/images/jpg/fissure_maison.webp',
        content: "Sur mon territoire, des actions collectives sont portées par l’État et les collectivités afin de mettre en œuvre des solutions techniques uniquement pour les phénomènes déclarés et peu actifs, afin de limiter le risque à défaut de le supprimer.",
        content1 : '',
      },
      {
        label: "Exemples",
        image: 'assets/images/jpg/fissure_1.webp',
        content: "À Ceyras, village sur un plateau dominant la Lergue, les habitations les plus exposées ont été démolies et le site sécurisé ; à Saint-Bauzille-de-Putois, des travaux urgents de consolidation ont été réalisés pour ceinturer l'Aiguille des Demoiselles avec un dispositif de surveillance.",
        content1: '',
      },
      {
        label: 'Mon logement',
        image: 'assets/images/jpg/fissure_2.webp',
        content: "Je signale l’existence d’une cavité souterraine. Afin de prévenir les désordres liés au retrait-gonflement des argiles, je mets en oeuvre des travaux de réduction de vulnérabilité de mon logement : adaptation des fondations, rigidification de la structure du bâtiment, etc.",
        content1: '',
      },
      {
        label: 'Guide technique',
        image: 'assets/images/jpg/guide.webp',
        content: "Un guide technique <a href='https://www.ecologie.gouv.fr/sites/default/files/documents/construire_en_terrain_argileux_reglementation_et_bonnes_pratiques-v_modif%20ccmi.pdf' target='_blank' rel='noopener noreferrer' class='text-blue-400 underline'> « prévenir les désordres dans l'habitat individuel »</a>  est à ma disposition.",
        content1: ''
      }
    ];
}