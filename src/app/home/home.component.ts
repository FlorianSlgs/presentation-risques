// app.component.ts (version mise à jour)
import { Component, ElementRef, HostListener, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import des composants pages
import { AccueilComponent } from '../pages/accueil/accueil.component';
import { Page1Component } from '../pages/page1/page1.component';
import { Page2Component } from '../pages/page2/page2.component';
import { Page3Component } from '../pages/page3/page3.component';
import { Page4Component } from '../pages/page4/page4.component';
import { Page5Component } from '../pages/page5/page5.component';


// Import du modèle
import { Section } from '../section.model';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    AccueilComponent,
    Page1Component,
    Page2Component,
    Page3Component,
    Page4Component,
    Page5Component
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy  {
title = 'PresentationRisques';
  
  @ViewChild('sectionsContainer') sectionsContainer!: ElementRef;

  sections: Section[] = [
    { id: 'accueil', title: 'Présentation des Risques', component: AccueilComponent },
    { id: 'page1', title: 'Présentation des Risques', component: Page1Component },
    { id: 'page2', title: 'Présentation des Risques', component: Page2Component },
    { id: 'page3', title: 'Présentation des Risques', component: Page3Component },
    { id: 'page4', title: 'Lors d\'un événement majeur', component: Page4Component },
    { id: 'page5', title: 'Kit urgence', component: Page5Component }
  ];

  currentSection = 0;
  isScrolling = false;
  private wheelTimeout: any;
  private wheelDelta = 0;
  private touchStartY: number | null = null;

  ngAfterViewInit() {
    if (this.sectionsContainer) {
      this.sectionsContainer.nativeElement.style.transitionDuration = '500ms';
    }
    // Empêche le scroll natif du body sur mobile
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy() {
    if (this.wheelTimeout) {
      clearTimeout(this.wheelTimeout);
    }
    // Restaure le scroll natif si besoin
    document.body.style.overflow = '';
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    
    if (this.isScrolling) return;

    const isTrackpad = Math.abs(event.deltaY) < 50;
    
    if (isTrackpad) {
      this.wheelDelta += event.deltaY;
      
      clearTimeout(this.wheelTimeout);
      this.wheelTimeout = setTimeout(() => {
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

    setTimeout(() => {
      this.isScrolling = false;
    }, 500);
  }

  getDotClasses(i: number): string {
    const isActive = this.currentSection === i;
    const base = 'w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2';
    const color = this.isArrowWhite() ? 'bg-white border-white' : 'bg-black border-black';
    return `${base} ${color} ${isActive ? 'scale-125' : 'opacity-60'}`;
  }

  // Méthode pour gérer l'événement du composant intro
  onIntroNext() {
    this.nextSection();
  }

  isArrowWhite(): boolean {
    // page1 et suivantes (index >= 1)
    return this.currentSection >= 1;
  }
}