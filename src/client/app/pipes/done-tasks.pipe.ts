import {Pipe, PipeTransform} from '@angular/core';
import {Task} from '../models/task';

@Pipe({
  name: 'doneTasks'
})
export class DoneTasksPipe implements PipeTransform {
  transform(tasks: Task[], done = true): unknown {
    return tasks.filter(task => task.finishedAt !== null === done);
  }
}
