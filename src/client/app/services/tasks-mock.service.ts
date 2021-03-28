import {Injectable} from '@angular/core';
import {CrudServiceInterface} from './crud-service-interface';
import {Task} from '../models/task';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksMockService implements CrudServiceInterface<Task>{

  constructor() {
  }

  save(t: Task): Observable<Task> {
    t.id = 'asdfghjkl';
    return of(t);
  }

  update(t: Task): Observable<Task> {
    return of(t);
  }

  findAll(): Observable<Task[]> {
    return undefined;
  }

  delete(t: Task): Observable<Task> {
    return of(t);
  }
}
