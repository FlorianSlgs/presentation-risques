import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snap-scroll-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section 
      [class]="sectionClasses"
      [style.background-color]="backgroundColor">
      <ng-content></ng-content>
    </section>
  `
})
export class SnapScrollSectionComponent {
  @Input() backgroundColor?: string;
  @Input() textColor?: string = 'text-white';
  @Input() customClasses?: string = '';

  get sectionClasses(): string {
    return `h-screen w-full flex items-center justify-center ${this.textColor} ${this.customClasses}`;
  }
}
