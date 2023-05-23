import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AuthGuardGuard } from './Services/authService/auth-guard.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { BaseDashboardComponent } from './pages/base-dashboard/base-dashboard.component';
import { HomePageComponent } from './pages/home-page/home-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'home/login', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, children: [
    { path: 'login', component: LogInComponent },
    { path: 'register', component: RegisterComponent },
  ] },

  { path: 'dashboard', component: BaseDashboardComponent, canActivate: [AuthGuardGuard], children: [
    { path: '', redirectTo: '/home/login', pathMatch: 'full' },
    { path: 'user', component: UserPageComponent, canActivate: [AuthGuardGuard] },
    { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuardGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardGuard] },
    { path: 'update-password', component: UpdatePasswordComponent, canActivate: [AuthGuardGuard] },
  ] },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
