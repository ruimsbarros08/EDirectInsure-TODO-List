import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsListComponent} from './components/project/projects-list.component';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './components/user/login.component';
import {LoggedInGuard} from './guards/logged-in.guard';
import {RegisterComponent} from './components/user/register.component';

const routes: Routes = [{
  path: '',
  component: ProjectsListComponent,
  canActivate: [AuthGuard],
}, {
  path: 'login',
  component: LoginComponent,
  canActivate: [LoggedInGuard]
}, {
  path: 'register',
  component: RegisterComponent,
  canActivate: [LoggedInGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
