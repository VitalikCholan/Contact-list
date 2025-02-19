import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

export const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'contact/new', component: ContactFormComponent },
  { path: 'contact/:id', component: ContactDetailsComponent },
  { path: 'contact/:id/edit', component: ContactFormComponent },
];
