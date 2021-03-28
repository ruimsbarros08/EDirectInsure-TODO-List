import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../models/task';

@Component({
  selector: 'app-todo-task',
  template: `
    {{ task.description }}
  `,
  styles: []
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  constructor() {
  }

  ngOnInit(): void {
  }

}
