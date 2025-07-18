import { Component, HostListener } from '@angular/core';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

interface ImageItem {
  src: string;
  title: string;
}

@Component({
  selector: 'app-page4',
  imports: [],
  templateUrl: './page4.component.html',
  styleUrl: './page4.component.scss',
  animations: [
    // Animation pour l'apparition des cartes d'images
    trigger('cardsAnimation', [
      transition(':enter', [
        query('.card-item', [
          style({ opacity: 0, transform: 'translateY(30px) scale(0.9)' }),
          stagger(100, [
            animate('0.5s cubic-bezier(0.35, 0, 0.25, 1)', 
              style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
          ])
        ], { optional: true })
      ])
    ]),
    
    // Animation pour le changement de couleur de fond
    trigger('backgroundColorChange', [
      transition('* => inondation', [
        animate('0.6s ease-in-out')
      ]),
      transition('* => feu', [
        animate('0.6s ease-in-out')
      ]),
      transition('* => terrain', [
        animate('0.6s ease-in-out')
      ])
    ])
  ]
})
export class Page4Component {
  selectedCategory: string = '';
  displayedImages: ImageItem[] = [];
  isDropdownOpen: boolean = false;
  // Variable pour gérer l'animation du fond
  backgroundState: string = 'default';

  // Données des images par catégorie
  private imageData: { [key: string]: ImageItem[] } = {
    inondation: [
      { src: 'assets/images/svg/contact.svg', title: "Rester en contact" },
      { src: 'assets/images/svg/abrite.svg', title: "Rester abrité" },
      { src: 'assets/images/svg/ascenseur.svg', title: "Pas prendre l'ascenseur" },
      { src: 'assets/images/svg/reseaux.svg', title: "Couper les réseaux" },
      { src: 'assets/images/svg/monter.svg', title: "Monter à l'étage" },
      { src: 'assets/images/svg/eloigner.svg', title: "S'éloigner des cours d'eau" }
    ],
    feu: [
      { src: 'assets/images/svg/contact.svg', title: "Rester en contact" },
      { src: 'assets/images/svg/abrite.svg', title: "Rester abrité" },
      { src: 'assets/images/svg/poumons.svg', title: "Protéger ses poumons" },
      { src: 'assets/images/svg/ascenseur.svg', title: "Ne pas prendre l'ascenseur" }
    ],
    terrain: [
      { src: 'assets/images/svg/contact.svg', title: "Rester en contact" },
      { src: 'assets/images/svg/zone.svg', title: "S'éloigner de la zone dangereuse" },
      { src: 'assets/images/svg/ascenseur.svg', title: "Ne pas prendre l'ascenseur" },
    ]
  };

  private categoryLabels: { [key: string]: string } = {
    inondation: 'Inondation',
    feu: 'Feu de forêt',
    terrain: 'Mouvement de terrain'
  };

  private categorySvgs: { [key: string]: string } = {
    inondation: 'assets/images/svg/inondation_react.svg',
    feu: 'assets/images/svg/feux_react.svg',
    terrain: 'assets/images/svg/mvt_react.svg'
  };

  // Fermer le dropdown quand on clique ailleurs
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.relative');
    if (!dropdown) {
      this.isDropdownOpen = false;
    }
  }

  onInformationsClick() {
    console.log('Bouton Informations cliqué');
    this.updateCategory('inondation');
  }

  onUrgenceClick() {
    console.log('Bouton Urgence cliqué');
    this.updateCategory('feu');
  }

  onContactClick() {
    console.log('Bouton Contact cliqué');
    this.updateCategory('terrain');
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCategory(category: string) {
    this.updateCategory(category);
    this.isDropdownOpen = false;
    console.log(`Catégorie sélectionnée: ${category}`);
  }

  private updateCategory(category: string) {
    this.selectedCategory = category;
    this.displayedImages = this.imageData[category];
    this.backgroundState = category;
  }

  getCategoryLabel(category: string): string {
    return this.categoryLabels[category] || '';
  }

  getCategorySvg(category: string): string {
    return this.categorySvgs[category] || '';
  }

  // Méthode pour obtenir les classes CSS du fond selon la catégorie
  getBackgroundClasses(): string {
    const baseClasses = 'min-h-screen w-full flex flex-col items-center justify-start text-white relative transition-all duration-700 ease-in-out';
    
    switch(this.selectedCategory) {
      case 'inondation':
        return `${baseClasses} bg-gradient-to-br from-blue-600 to-blue-800`;
      case 'feu':
        return `${baseClasses} bg-gradient-to-br from-red-600 to-orange-700`;
      case 'terrain':
        return `${baseClasses} bg-gradient-to-br from-amber-600 to-orange-600`;
      default:
        return `${baseClasses} bg-gradient-to-br from-blue-600 to-[#126091]`;
    }
  }
}