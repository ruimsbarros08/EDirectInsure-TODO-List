import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Task} from '../../models/task';
import {tap} from 'rxjs/operators';
import {Project} from '../../models/project';
import {TasksService} from '../../services/tasks.service';

@Component({
  selector: 'app-new-task',
  template: `
    <span class="float-left">
      <input [formControl]="form" class="form-control form-control-sm">
    </span>
    <span class="float-right">
      <button class="btn btn-sm btn-success" [disabled]="form.invalid" (click)="createTask()">Add</button>
    </span>
  `,
  styles: [],
})
export class NewTaskComponent implements OnInit, OnDestroy {
  @Input() project: Project;
  @Output() create = new EventEmitter<Task>();
  form: FormControl;
  private subscription = new Subscription();

  constructor(private tasksService: TasksService) {
  }

  ngOnInit(): void {
    this.form = new FormControl('', Validators.required);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createTask(): void {
    const t: Task = {
      description: this.form.value,
    };

    const sub = this.tasksService.save(this.project, t).pipe(
      tap(task => this.create.emit(task)),
      tap(() => this.form.setValue('')),
    ).subscribe();
    this.subscription.add(sub);
  }
}
