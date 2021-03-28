import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsListComponent} from './components/project/projects-list.component';

const routes: Routes = [{
  path: '',
  component: ProjectsListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
