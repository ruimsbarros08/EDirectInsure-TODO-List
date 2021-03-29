import {Component, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../../models/project';
import {tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {ProjectsService} from '../../services/projects.service';

@Component({
  selector: 'app-projects-list',
  template: `
    <div class="row">
      <div class="col-md-6 col-sm-12" *ngFor="let project of projects; let i = index">
        <app-project-detail [project]="project" (delete)="deleteProject(project, i)"></app-project-detail>
      </div>
      <div class="col-md-6 col-sm-12">
        <app-new-project (create)="create($event)"></app-new-project>
      </div>
    </div>
  `,
  styles: []
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  projects: Project[];
  private subscription = new Subscription();

  constructor(private projectsService: ProjectsService) {
  }

  ngOnInit(): void {
    const sub = this.projectsService.findAll().pipe(
      tap(projects => this.projects = projects),
    ).subscribe();

    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteProject(project: Project, i: number): void {
    this.projects.splice(i, 1);
  }

  create(project: Project): void {
    this.projects.push(project);
  }
}
