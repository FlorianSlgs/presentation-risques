import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-consequences-feux',
  templateUrl: './consequences.component.html',
  styleUrls: ['./consequences.component.scss'],
  standalone: true,
  imports: []
})
export class ConsequencesFeuxComponent implements OnInit, OnDestroy {
  // État pour gérer l'ouverture/fermeture des panneaux sur mobile
  openPanel: number | null = 1; // Ouvre automatiquement le panneau 1 (victimes humaines)

  ngOnInit() {
    // Ajouter l'event listener pour fermer au clic ailleurs
    document.addEventListener('click', this.onDocumentClick.bind(this));
  }

  ngOnDestroy() {
    // Nettoyer l'event listener
    document.removeEventListener('click', this.onDocumentClick.bind(this));
  }

  togglePanel(panelIndex: number) {
    this.openPanel = this.openPanel === panelIndex ? null : panelIndex;
  }

  isPanelOpen(panelIndex: number): boolean {
    return this.openPanel === panelIndex;
  }

  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    // Vérifier si le clic est en dehors du composant
    if (!target.closest('.consequences-container')) {
      this.openPanel = null;
    }
  }

  // Empêcher la propagation du clic sur les boutons et panneaux
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}