import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { firebaseConfig } from './enviroments/enviroment';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));



