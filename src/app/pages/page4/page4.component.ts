import { Component, HostListener, OnInit } from '@angular/core';

interface ImageItem {
  src: string;
  title: string;
  link?: string; // Optionnel avec ?
}

@Component({
  selector: 'app-page4',
  imports: [],
  templateUrl: './page4.component.html',
  styleUrl: './page4.component.scss',
})
export class Page4Component implements OnInit {
  selectedCategory: string = '';
  displayedImages: ImageItem[] = [];
  isDropdownOpen: boolean = false;
  // Variable pour gérer l'animation du fond
  backgroundState: string = 'default';

  // Données des images par catégorie avec liens externes (optionnels)
  private imageData: { [key: string]: ImageItem[] } = {
    inondation: [
      { 
        src: 'assets/images/svg/contact.svg', 
        title: "Rester en contact",
        link: 'https://www.georisques.gouv.fr/me-preparer-me-proteger/que-faire-en-cas-d-inondation'
      },
      { 
        src: 'assets/images/svg/ascenseur.svg', 
        title: "Na pas prendre l'ascenseur",
        link: 'https://www.georisques.gouv.fr/me-preparer-me-proteger/que-faire-en-cas-d-inondation'
      },
      { 
        src: 'assets/images/svg/reseaux.svg', 
        title: "Couper les réseaux",
        link: 'https://www.georisques.gouv.fr/me-preparer-me-proteger/que-faire-en-cas-d-inondation'
      },
      { 
        src: 'assets/images/svg/abrite.svg', 
        title: "Rester abrité",
        link: 'https://www.georisques.gouv.fr/me-preparer-me-proteger/que-faire-en-cas-d-inondation'
      },
      { 
        src: 'assets/images/svg/monter.svg', 
        title: "Monter à l'étage",
        link: 'https://www.georisques.gouv.fr/me-preparer-me-proteger/que-faire-en-cas-d-inondation'
      },
      { 
        src: 'assets/images/svg/eloigner.svg', 
        title: "S'éloigner des cours d'eau",
        link: 'https://www.georisques.gouv.fr/me-preparer-me-proteger/que-faire-en-cas-d-inondation'
      }
    ],
    feu: [
      { 
        src: 'assets/images/svg/contact.svg', 
        title: "Rester en contact",
        link: 'https://www.georisques.gouv.fr/me-preparer-me-proteger/que-faire-en-cas-de-feu-de-foret'
      },
      { 
        src: 'assets/images/svg/abrite_feux.svg', 
        title: "Rester abrité",
        link: 'https://www.georisques.gouv.fr/me-preparer-me-proteger/que-faire-en-cas-de-feu-de-foret'
      },
      { 
        src: 'assets/images/svg/poumons.svg', 
        title: "Protéger ses poumons",
        link: 'https://www.georisques.gouv.fr/me-preparer-me-proteger/que-faire-en-cas-de-feu-de-foret'
      },
      { 
        src: 'assets/images/svg/ascenseur.svg', 
        title: "Ne pas prendre l'ascenseur",
        link: 'https://www.georisques.gouv.fr/me-preparer-me-proteger/que-faire-en-cas-de-feu-de-foret'
      }
    ],
    terrain: [
      { 
        src: 'assets/images/svg/contact.svg', 
        title: "Rester en contact"
      },
      { 
        src: 'assets/images/svg/zone.svg', 
        title: "S'éloigner de la zone dangereuse"
      },
      { 
        src: 'assets/images/svg/ascenseur.svg', 
        title: "Ne pas prendre l'ascenseur"
      },
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

  // Initialisation automatique avec inondation
  ngOnInit() {
    this.updateCategory('inondation');
  }

  // Fermer le dropdown quand on clique ailleurs
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.relative');
    if (!dropdown) {
      this.isDropdownOpen = false;
    }
  }

  onInondationsClick() {
    this.updateCategory('inondation');
  }

  onFeuxClick() {
    this.updateCategory('feu');
  }

  onTerrainClick() {
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

  getBackgroundClasses(): string {
    const baseClasses = 'min-h-screen w-full flex flex-col items-center justify-start text-white relative';
    
    switch(this.selectedCategory) {
      case 'inondation':
        return `${baseClasses} bg-gradient-to-br from-blue-600 to-blue-800 transition-all duration-700 ease-in-out`;
      case 'feu':
        return `${baseClasses} bg-gradient-to-br from-green-600 to-green-800 transition-all duration-700 ease-in-out`;
      case 'terrain':
        return `${baseClasses} bg-gradient-to-br from-amber-600 to-orange-600 transition-all duration-700 ease-in-out`;
      default:
        return `${baseClasses} bg-gradient-to-br from-blue-600 to-[#126091] transition-all duration-700 ease-in-out`;
    }
  }
}