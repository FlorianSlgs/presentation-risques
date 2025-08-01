import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAPIComponent } from './papi/papi.component';
import { PPRIComponent } from './ppri/ppri.component';

@Component({
  selector: 'app-actions-prevention',
  standalone: true,
  imports: [CommonModule, PAPIComponent, PPRIComponent],
  templateUrl: './actions-prevention.component.html',
  styleUrls: ['./actions-prevention.component.scss']
})
export class ActionsPreventionComponent {
selectedTab = 0;
  tabs = [
    {
      label: 'Logement',
    },
    {
      label: 'PAPI',
    },
    {
      label: 'PPRi',
    }
  ];
}