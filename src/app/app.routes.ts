// app.routes.ts
import { Routes } from '@angular/router';
import { SourcesComponent } from './sources/sources.component';
import { MentionsComponent } from './mentions/mentions.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sources', component: SourcesComponent },
  { path: 'mentions', component: MentionsComponent },
  { path: '**', redirectTo: '/home' }
];