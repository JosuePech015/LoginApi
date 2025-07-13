import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./AppMajo/app-majo.routes').then(m => m.appMajoRoutes) },
];

