import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAPIComponent } from './papi/papi.component';
import { PPRIComponent } from './ppri/ppri.component';

@Component({
  selector: 'app-actions-prevention-feux',
  standalone: true,
  imports: [CommonModule, PAPIComponent, PPRIComponent],
  templateUrl: './actions-prevention.component.html',
  styleUrls: ['./actions-prevention.component.scss']
})
export class ActionsPreventionFeuxComponent {
selectedTab = 0;
  tabs = [
    {
      label: 'PAPI',
      content: 'Je contribue également à ma protection dans mon logement. Si ma commune relève d’un programme d’actions de prévention des inondations :',
      content1 : 'Je contribue également à ma protection dans mon logement. Si ma commune est couverte par un programme d’actions de prévention des inondations, je me rapproche de l’EPTB compétent et des diagnostiqueurs qui me conseilleront sur les mesures adaptées à mon logement. ',
    },
    {
      label: 'PPRi',
      content: 'En l’absence de PAPI, si ma commune est couverte par un plan de prévention des risques naturels d’inondation :',
      content1: 'En l’absence de PAPI, si ma commune est couverte par un plan de prévention des risques naturels d’inondation, je peux avoir une obligation règlementaire de réaliser des travaux de mise en sécurité en cas d’inondation.',
    }
  ];
}