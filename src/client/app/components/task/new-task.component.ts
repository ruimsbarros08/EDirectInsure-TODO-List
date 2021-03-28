import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Task} from '../../models/task';
import {TasksMockService} from '../../services/tasks-mock.service';
import {tap} from 'rxjs/operators';

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
  @Output() create = new EventEmitter<Task>();
  form: FormControl;
  private subscription = new Subscription();

  constructor(private tasksService: TasksMockService) {
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

    const sub = this.tasksService.save(t).pipe(
      tap(task => this.create.emit(task)),
      tap(() => this.form.setValue('')),
    ).subscribe();
    this.subscription.add(sub);
  }
}
