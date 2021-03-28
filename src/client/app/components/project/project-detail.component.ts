import {Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {Project} from '../../models/project';
import {faTrash, faEdit, faSave, faTimes} from '@fortawesome/free-solid-svg-icons';
import {ProjectsMockService} from '../../services/projects-mock.service';
import {Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {FormControl, Validators} from '@angular/forms';
import {Task} from '../../models/task';

@Component({
  selector: 'app-project-detail',
  template: `
    <div class="card">
      <div class="card-header alert-info">
        <span class="float-left" *ngIf="!editing">
          {{ project.name }}
        </span>
        <span class="float-left" *ngIf="editing">
          <input [formControl]="form" class="form-control form-control-sm">
        </span>
        <span class="float-right">
          <button class="btn btn-sm" *ngIf="!editing" (click)="editing = true">
            <fa-icon [icon]="iconEdit"></fa-icon>
          </button>
          <button class="btn btn-sm" *ngIf="editing" (click)="closeEditing()">
            <fa-icon [icon]="iconClose"></fa-icon>
          </button>
          <button class="btn btn-sm" *ngIf="editing && form.valid" (click)="editProject()">
            <fa-icon [icon]="iconSave"></fa-icon>
          </button>
          <button class="btn btn-sm" *ngIf="!editing" (click)="deleteProject()">
            <fa-icon [icon]="iconTrash"></fa-icon>
          </button>
        </span>
      </div>
      <div class="card-header">To Do:</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" *ngFor="let task of tasks.notDone; let i = index">
          <app-task [task]="task" (markedAsDone)="markedAsDone($event, i)" (delete)="deleteTask($event, i)"></app-task>
        </li>
      </ul>
      <div class="card-header">Done:</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" *ngFor="let task of tasks.done; let i = index">
          <app-task [task]="task" (markedAsNotDone)="markedAsNotDone($event, i)"></app-task>
        </li>
      </ul>
    </div>
  `,
  styles: [],
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  @Input() project: Project;
  @Output() delete = new EventEmitter<Project>();
  @Output() edit = new EventEmitter<Project>();
  iconTrash = faTrash;
  iconEdit = faEdit;
  iconSave = faSave;
  iconClose = faTimes;
  editing = false;
  private subscription = new Subscription();
  form: FormControl;
  tasks: {notDone: Task[], done: Task[]};

  constructor(private projectsService: ProjectsMockService) {
  }

  ngOnInit(): void {
    this.form = new FormControl(this.project.name, Validators.required);
    this.prepareTasks();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteProject(): void {
    const sub = this.projectsService.delete(this.project).pipe(
      tap(project => this.delete.emit(project)),
    ).subscribe();
    this.subscription.add(sub);
  }

  editProject(): void {
    const p: Project = {
      id: this.project.id,
      name: this.form.value,
      tasks: this.project.tasks,
    };

    const sub = this.projectsService.update(p).pipe(
      tap(() => this.editing = false),
      tap(project => this.project = project),
      tap(project => this.edit.emit(project)),
    ).subscribe();
    this.subscription.add(sub);
  }

  closeEditing(): void {
    this.editing = false;
    this.form.setValue(this.project.name);
  }

  markedAsDone(task: Task, index: number): void {
    this.tasks.notDone.splice(index, 1);
    this.tasks.done.push(task);
  }

  markedAsNotDone(task: Task, index: number): void {
    this.tasks.done.splice(index, 1);
    this.tasks.notDone.push(task);
  }

  private prepareTasks(): void {
    this.tasks = {done: [], notDone: []};
    this.project.tasks.reduce((tasks, task) => {
      if (task.finishedAt) {
        tasks.done.push(task);
        return tasks;
      }

      tasks.notDone.push(task);
      return tasks;
    }, this.tasks);
  }

  deleteTask(task: Task, i: number): void {
    this.tasks.notDone.splice(i, 1);
  }
}
