// app.component.ts
import { Component, ElementRef, HostListener, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="snap-scroll-container relative h-screen overflow-hidden">
      <!-- Navigation dots -->
      <nav class="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-3">
        <button
          *ngFor="let section of sections; let i = index"
          (click)="scrollToSection(i)"
          [class]="getDotClasses(i)"
          [attr.aria-label]="'Aller à la section ' + (i + 1)"
          [title]="section.title">
          <span class="sr-only">Section {{ i + 1 }}</span>
        </button>
      </nav>

      <!-- Sections container -->
      <div 
        #sectionsContainer
        class="snap-scroll-wrapper transition-transform duration-500 ease-out"
        [style.transform]="'translateY(-' + (currentSection * 100) + 'vh)'">
        
        <!-- Section 1 -->
        <section class="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div class="text-center">
            <h1 class="text-6xl font-bold mb-6">{{ sections[0].title }}</h1>
            <p class="text-xl max-w-2xl mx-auto">Bienvenue dans cette présentation sur les risques</p>
            <div class="mt-8">
              <button 
                (click)="nextSection()"
                class="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-full transition-all duration-200">
                Commencer
              </button>
            </div>
          </div>
        </section>

        <!-- Section 2 -->
        <section class="h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800 text-white">
          <div class="text-center max-w-4xl mx-auto px-6">
            <h2 class="text-5xl font-bold mb-8">{{ sections[1].title }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 class="text-2xl font-semibold mb-4">Types de risques</h3>
                <ul class="text-left space-y-2">
                  <li>• Risques opérationnels</li>
                  <li>• Risques financiers</li>
                  <li>• Risques stratégiques</li>
                  <li>• Risques de conformité</li>
                </ul>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 class="text-2xl font-semibold mb-4">Impact</h3>
                <ul class="text-left space-y-2">
                  <li>• Pertes financières</li>
                  <li>• Réputation</li>
                  <li>• Conformité réglementaire</li>
                  <li>• Continuité d'activité</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 3 -->
        <section class="h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-600 to-green-800 text-white">
          <div class="text-center max-w-4xl mx-auto px-6">
            <h2 class="text-5xl font-bold mb-8">{{ sections[2].title }}</h2>
            <div class="space-y-6">
              <div class="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                <h3 class="text-3xl font-semibold mb-6">Processus de gestion</h3>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div class="text-center">
                    <div class="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <span class="text-2xl font-bold">1</span>
                    </div>
                    <p>Identification</p>
                  </div>
                  <div class="text-center">
                    <div class="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <span class="text-2xl font-bold">2</span>
                    </div>
                    <p>Évaluation</p>
                  </div>
                  <div class="text-center">
                    <div class="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <span class="text-2xl font-bold">3</span>
                    </div>
                    <p>Traitement</p>
                  </div>
                  <div class="text-center">
                    <div class="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <span class="text-2xl font-bold">4</span>
                    </div>
                    <p>Surveillance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 4 -->
        <section class="h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-600 to-red-800 text-white">
          <div class="text-center max-w-4xl mx-auto px-6">
            <h2 class="text-5xl font-bold mb-8">{{ sections[3].title }}</h2>
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 class="text-3xl font-semibold mb-6">Points clés à retenir</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 class="text-xl font-semibold mb-3">Prévention</h4>
                  <ul class="space-y-2">
                    <li>• Anticipation des risques</li>
                    <li>• Mise en place de contrôles</li>
                    <li>• Formation du personnel</li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-xl font-semibold mb-3">Réaction</h4>
                  <ul class="space-y-2">
                    <li>• Plan de continuité</li>
                    <li>• Gestion de crise</li>
                    <li>• Communication</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- Navigation arrows -->
      <div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col space-y-2">
        <button
          *ngIf="currentSection > 0"
          (click)="previousSection()"
          class="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-200">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
          </svg>
        </button>
        <button
          *ngIf="currentSection < sections.length - 1"
          (click)="nextSection()"
          class="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-200">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>

      <!-- Instructions -->
      <div class="fixed bottom-6 right-6 z-50 text-white/70 text-sm">
        <p>Utilisez ↑↓ ou la molette pour naviguer</p>
      </div>
    </div>
  `,
  styles: [`
    .snap-scroll-container {
      scroll-behavior: smooth;
    }
  `]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'PresentationRisques';
  
  @ViewChild('sectionsContainer') sectionsContainer!: ElementRef;

  sections = [
    { id: 'intro', title: 'Présentation des Risques' },
    { id: 'types', title: 'Types de Risques' },
    { id: 'gestion', title: 'Gestion des Risques' },
    { id: 'conclusion', title: 'Conclusion' }
  ];

  currentSection = 0;
  isScrolling = false;
  private wheelTimeout: any;
  private wheelDelta = 0; // Accumulation pour trackpad
  private touchStartY: number | null = null;

  ngAfterViewInit() {
    // Configuration du conteneur avec transition plus rapide
    if (this.sectionsContainer) {
      this.sectionsContainer.nativeElement.style.transitionDuration = '500ms';
    }
  }

  ngOnDestroy() {
    if (this.wheelTimeout) {
      clearTimeout(this.wheelTimeout);
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    
    if (this.isScrolling) return;

    // Détection du type d'appareil de pointage
    const isTrackpad = Math.abs(event.deltaY) < 50;
    
    if (isTrackpad) {
      // Gestion spécifique trackpad avec accumulation
      this.wheelDelta += event.deltaY;
      
      clearTimeout(this.wheelTimeout);
      this.wheelTimeout = setTimeout(() => {
        // Seuil adaptatif pour trackpad
        if (Math.abs(this.wheelDelta) > 30) {
          if (this.wheelDelta > 0) {
            this.nextSection();
          } else {
            this.previousSection();
          }
        }
        this.wheelDelta = 0;
      }, 100);
    } else {
      // Gestion directe pour souris classique
      clearTimeout(this.wheelTimeout);
      if (event.deltaY > 0) {
        this.nextSection();
      } else {
        this.previousSection();
      }
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.isScrolling) return;

    switch (event.key) {
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        event.preventDefault();
        this.nextSection();
        break;
      case 'ArrowUp':
      case 'PageUp':
        event.preventDefault();
        this.previousSection();
        break;
      case 'Home':
        event.preventDefault();
        this.scrollToSection(0);
        break;
      case 'End':
        event.preventDefault();
        this.scrollToSection(this.sections.length - 1);
        break;
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (!this.touchStartY || this.isScrolling) return;

    const touchEndY = event.changedTouches[0].clientY;
    const diff = this.touchStartY - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.nextSection();
      } else {
        this.previousSection();
      }
    }

    this.touchStartY = null;
  }

  nextSection() {
    if (this.currentSection < this.sections.length - 1 && !this.isScrolling) {
      this.scrollToSection(this.currentSection + 1);
    }
  }

  previousSection() {
    if (this.currentSection > 0 && !this.isScrolling) {
      this.scrollToSection(this.currentSection - 1);
    }
  }

  scrollToSection(index: number) {
    if (index < 0 || index >= this.sections.length || this.isScrolling) return;

    this.isScrolling = true;
    this.currentSection = index;

    // Durée de transition réduite pour plus de réactivité
    setTimeout(() => {
      this.isScrolling = false;
    }, 500);
  }

  getDotClasses(index: number): string {
    const baseClasses = 'w-3 h-3 rounded-full transition-all duration-300 hover:scale-125';
    const activeClasses = 'bg-white scale-125';
    const inactiveClasses = 'bg-white/50 hover:bg-white/75';
    
    return `${baseClasses} ${index === this.currentSection ? activeClasses : inactiveClasses}`;
  }
}