import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'insecure/login',
    component: LoginComponent,
    data: { routeType: 'insecure' },
  },
  {
    path: 'secure/login',
    component: LoginComponent,
    data: { routeType: 'secure' },
  },
  {
    path: 'insecure/comments',
    component: CommentsComponent,
    data: { routeType: 'insecure' },
  },
  {
    path: 'secure/comments',
    component: CommentsComponent,
    data: { routeType: 'secure' },
  },
  {
    path: 'secure/profile/:id',
    component: ProfileComponent,
    data: { routeType: 'secure' },
  },
  {
    path: 'unsecure/profile/:id',
    component: ProfileComponent,
    data: { routeType: 'unsecure' },
  },
];
