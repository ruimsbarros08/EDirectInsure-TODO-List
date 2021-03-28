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
import { NewTaskComponent } from './components/task/new-task.component';
import { LoginComponent } from './components/user/login.component';
import { RegisterComponent } from './components/user/register.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsListComponent,
    TaskComponent,
    ProjectDetailComponent,
    NewProjectComponent,
    NewTaskComponent,
    LoginComponent,
    RegisterComponent,
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
