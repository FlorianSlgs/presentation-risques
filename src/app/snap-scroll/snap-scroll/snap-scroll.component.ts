import { Component, ElementRef, HostListener, Input, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SnapScrollSection {
  id: string;
  title?: string;
  backgroundColor?: string;
  textColor?: string;
}

@Component({
  selector: 'app-snap-scroll',
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
          [title]="section.title || 'Section ' + (i + 1)">
          <span class="sr-only">Section {{ i + 1 }}</span>
        </button>
      </nav>

      <!-- Sections container -->
      <div 
        #sectionsContainer
        class="snap-scroll-wrapper transition-transform duration-700 ease-in-out"
        [style.transform]="'translateY(-' + (currentSection * 100) + 'vh)'">
        
        <ng-content></ng-content>
        
      </div>

      <!-- Navigation arrows (optional) -->
      <div *ngIf="showArrows" class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col space-y-2">
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
    </div>
  `,
  styles: [`
    .snap-scroll-container {
      scroll-behavior: smooth;
    }
    
    .snap-scroll-wrapper > * {
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class SnapScrollComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() sections: SnapScrollSection[] = [];
  @Input() showArrows: boolean = true;
  @Input() enableKeyboard: boolean = true;
  @Input() enableMouse: boolean = true;
  @Input() animationDuration: number = 700;

  @ViewChild('sectionsContainer') sectionsContainer!: ElementRef;

  currentSection = 0;
  isScrolling = false;
  private wheelTimeout: any;

  ngOnInit() {
    // Initialiser les sections par défaut si aucune n'est fournie
    if (this.sections.length === 0) {
      this.sections = [
        { id: 'section-1', title: 'Section 1', backgroundColor: 'bg-blue-600' },
        { id: 'section-2', title: 'Section 2', backgroundColor: 'bg-purple-600' },
        { id: 'section-3', title: 'Section 3', backgroundColor: 'bg-green-600' }
      ];
    }
  }

  ngAfterViewInit() {
    // Configurer le style du conteneur
    if (this.sectionsContainer) {
      this.sectionsContainer.nativeElement.style.transitionDuration = `${this.animationDuration}ms`;
    }
  }

  ngOnDestroy() {
    if (this.wheelTimeout) {
      clearTimeout(this.wheelTimeout);
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (!this.enableMouse || this.isScrolling) return;

    event.preventDefault();
    
    // Debounce pour éviter le scroll trop rapide
    clearTimeout(this.wheelTimeout);
    this.wheelTimeout = setTimeout(() => {
      if (event.deltaY > 0) {
        this.nextSection();
      } else {
        this.previousSection();
      }
    }, 50);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.enableKeyboard || this.isScrolling) return;

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

    // Minimum de 50px de mouvement pour déclencher le scroll
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.nextSection();
      } else {
        this.previousSection();
      }
    }

    this.touchStartY = null;
  }

  private touchStartY: number | null = null;

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

    // Réactiver le scroll après l'animation
    setTimeout(() => {
      this.isScrolling = false;
    }, this.animationDuration);
  }

  getDotClasses(index: number): string {
    const baseClasses = 'w-3 h-3 rounded-full transition-all duration-300 hover:scale-125';
    const activeClasses = 'bg-white scale-125';
    const inactiveClasses = 'bg-white/50 hover:bg-white/75';
    
    return `${baseClasses} ${index === this.currentSection ? activeClasses : inactiveClasses}`;
  }
}