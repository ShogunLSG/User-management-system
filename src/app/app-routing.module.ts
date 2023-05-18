import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AuthGuardGuard } from './Services/authService/auth-guard.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'admin' , component: AdminPageComponent,canActivate: [AuthGuardGuard]},
  {path: 'user' , component: UserPageComponent, canActivate: [AuthGuardGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
