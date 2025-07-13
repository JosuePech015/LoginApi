import { Routes } from '@angular/router';
import { BanxicoComponent } from './banxico/banxico.component';
import { LoginComponent } from './login/login.component';
import { WeathermapComponent } from './weathermap/weathermap.component';
import { MailchimpComponent } from './mailchimp/mailchimp.component';

export const appMajoRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'weathermap', component: WeathermapComponent },
  { path: 'banxico', component: BanxicoComponent },
  { path: 'mailchimp', component: MailchimpComponent }, // Nueva ruta
];

export default appMajoRoutes;