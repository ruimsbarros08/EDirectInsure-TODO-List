import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProjectsListComponent} from './components/project/projects-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TaskComponent} from './components/task/task.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ProjectDetailComponent} from './components/project/project-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NewProjectComponent} from './components/project/new-project.component';
import {TimeagoModule} from 'ngx-timeago';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsListComponent,
    TaskComponent,
    ProjectDetailComponent,
    NewProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TimeagoModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
