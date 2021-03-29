import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Project} from '../../models/project';
import {tap} from 'rxjs/operators';
import {ProjectsService} from '../../services/projects.service';

@Component({
  selector: 'app-new-project',
  template: `
    <div class="card">
      <div class="card-header alert-info">New Project</div>
      <div class="card-body">
        <span class="float-left">
          <input [formControl]="form" class="form-control form-control-sm">
        </span>
        <span class="float-right">
          <button class="btn btn-sm btn-success" [disabled]="form.invalid" (click)="createProject()">Add</button>
        </span>
      </div>
    </div>
  `,
  styles: [],
})
export class NewProjectComponent implements OnInit, OnDestroy {
  @Output() create = new EventEmitter<Project>();
  form: FormControl;
  private subscription = new Subscription();

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.form = new FormControl('', Validators.required);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createProject(): void {
    const p: Project = {
      name: this.form.value,
      tasks: [],
    };

    const sub = this.projectsService.save(p).pipe(
      tap(() => this.form.setValue('')),
      tap(project => this.create.emit(project)),
    ).subscribe();
    this.subscription.add(sub);
  }
}
