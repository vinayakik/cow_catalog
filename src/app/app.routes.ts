import { Routes } from '@angular/router';
import { CowListComponent } from './components/cow-list/cow-list.component';
import { CowFormComponent } from './components/cow-form/cow-form.component';
import { CowDetailComponent } from './components/cow-detail/cow-detail.component';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cows' },
  { path: 'cows', component: CowListComponent },
  { path: 'cows/new', component: CowFormComponent },
  { path: 'cows/:id', component: CowDetailComponent },
  { path: '**', redirectTo: 'cows' }
];
