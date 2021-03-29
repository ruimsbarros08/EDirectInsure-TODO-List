import {Injectable} from '@angular/core';
import {Task} from '../models/task';
import {Observable, of} from 'rxjs';
import {Project} from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class TasksMockService {

  constructor() {
  }

  save(project: Project, t: Task): Observable<Task> {
    t._id = 'asdfghjkl';
    return of(t);
  }

  update(project: Project, t: Task): Observable<Task> {
    return of(t);
  }

  delete(project: Project, t: Task): Observable<any> {
    return of({});
  }
}
