// src/app/shared/models/section.model.ts
export interface Section {
  id: string;
  title: string;
  component?: any;
}

export interface SectionComponent {
  title: string;
  id: string;
}