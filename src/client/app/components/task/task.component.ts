import {Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {Task} from '../../models/task';
import {faTrash, faEdit, faCheck, faRedo, faSave, faTimes} from '@fortawesome/free-solid-svg-icons';
import {TasksMockService} from '../../services/tasks-mock.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-task',
  template: `
    <span *ngIf="!task.finishedAt">
      <div *ngIf="!editing" class="float-left">
        {{ task.description }}
      </div>
      <div class="float-left" *ngIf="editing" [formGroup]="form">
        <input formControlName="description" class="form-control form-control-sm">
      </div>
      <div class="btn-group btn-group-sm float-right">
        <button type="button" class="btn btn-sm btn-success" (click)="markAsDone()" *ngIf="!editing">
          <fa-icon [icon]="iconDone"></fa-icon>
        </button>
        <button type="button" class="btn btn-sm" (click)="editing = true" *ngIf="!editing">
          <fa-icon [icon]="iconEdit"></fa-icon>
        </button>
        <button type="button" class="btn btn-sm btn-danger" (click)="deleteTask()" *ngIf="!editing">
          <fa-icon [icon]="iconTrash"></fa-icon>
        </button>

        <button class="btn btn-sm" (click)="closeEditing()" *ngIf="editing">
          <fa-icon [icon]="iconClose"></fa-icon>
        </button>
        <button class="btn btn-sm" (click)="editTaskDescription()" *ngIf="editing && form.valid">
          <fa-icon [icon]="iconSave"></fa-icon>
        </button>
      </div>
    </span>
    <span *ngIf="task.finishedAt">
      <div class="float-left">
        <del ngbTooltip="Done {{ task.finishedAt.toISOString() | timeago }}">{{ task.description }}</del>
      </div>
      <div class="float-right">
        <button type="button" class="btn btn-sm" (click)="markAsNotDone()"><fa-icon [icon]="iconNotDone"></fa-icon></button>
      </div>
    </span>
  `,
  styles: [],
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input() task: Task;
  @Output() markedAsDone = new EventEmitter<Task>();
  @Output() markedAsNotDone = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  iconTrash = faTrash;
  iconEdit = faEdit;
  iconDone = faCheck;
  iconNotDone = faRedo;
  iconSave = faSave;
  iconClose = faTimes;

  form: FormGroup;
  private subscription = new Subscription();
  editing = false;

  constructor(private tasksService: TasksMockService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      description: new FormControl(this.task.description, Validators.required),
      finishedAt: new FormControl(),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  markAsDone(): void {
    const t: Task = {
      id: this.task.id,
      description: this.task.description,
      createdAt: this.task.createdAt,
      finishedAt: new Date(),
    };

    const sub = this.updateTask(t).pipe(
      tap(task => this.markedAsDone.emit(task)),
    ).subscribe();
    this.subscription.add(sub);
  }

  markAsNotDone(): void {
    const t: Task = {
      id: this.task.id,
      description: this.task.description,
      createdAt: this.task.createdAt,
      finishedAt: null,
    };

    const sub = this.updateTask(t).pipe(
      tap(task => this.markedAsNotDone.emit(task)),
    ).subscribe();
    this.subscription.add(sub);
  }

  closeEditing(): void {
    this.editing = false;
    this.form.get('description').setValue(this.task.description);
  }

  editTaskDescription(): void {
    const t: Task = {
      id: this.task.id,
      description: this.form.get('description').value,
      createdAt: this.task.createdAt,
      finishedAt: this.task.finishedAt,
    };

    const subscription = this.updateTask(t).pipe(
      tap(() => this.editing = false),
    ).subscribe();
    this.subscription.add(subscription);
  }

  private updateTask(t: Task): Observable<Task> {
    return this.tasksService.update(t).pipe(
      tap(task => this.task = task),
      tap(task => {
        this.form.get('description').setValue(task.description);
        this.form.get('finishedAt').setValue(task.finishedAt);
      }),
    );
  }

  deleteTask(): void {
    const sub = this.tasksService.delete(this.task).pipe(
      tap(task => this.delete.emit(task)),
    ).subscribe();
    this.subscription.add(sub);
  }
}
