import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component'; // Changez ici !

bootstrapApplication(AppComponent, appConfig) // Et ici !
  .catch((err) => console.error(err));
