import { Routes } from '@angular/router';
import {HomeComponent} from "./componentes/home/home.component";
import {DashboardComponent} from "./componentes/dashboard/dashboard.component";
import {authGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
];
