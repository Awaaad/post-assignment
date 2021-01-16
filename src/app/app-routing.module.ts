import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './features/profile/profile.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PostDetailComponent } from './features/post-detail/post-detail.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './shared/auth/auth.guard';

const routes: Routes = [
  {
    path: 'profile', component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ADMIN']
    }
  },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ADMIN']
    }
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'post-detail/:id', component: PostDetailComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ADMIN']
    }
  },
  { path: 'redirect', redirectTo: 'login', pathMatch: 'full' }, // if 'redirect' is written in the URL navigate to DashboardComponent
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // if an unknown route is typed redirect to ProfileComponent
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
