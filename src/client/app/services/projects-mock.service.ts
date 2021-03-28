import {Injectable} from '@angular/core';
import {CrudServiceInterface} from './crud-service-interface';
import {Project} from '../models/project';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsMockService implements CrudServiceInterface<Project> {

  constructor() {
  }

  save(t: Project): Observable<Project> {
    t.id = 'asdfghjkl';
    return of(t);
  }

  update(t: Project): Observable<Project> {
    return of(t);
  }

  findAll(): Observable<Project[]> {
    return of([{
      id: 'asdfghjkl',
      name: 'Test Project 1',
      tasks: [{
        id: 'asdfghjkl',
        description: 'First Task',
        createdAt: new Date('2021-01-01'),
        finishedAt: null
      }, {
        id: 'asdfghjkl',
        description: 'Second Task',
        createdAt: new Date('2021-01-01'),
        finishedAt: new Date('2021-01-01')
      }],
    }, {
      id: 'asdfghjkl',
      name: 'Test Project 1',
      tasks: [{
        id: 'asdfghjkl',
        description: 'First Task',
        createdAt: new Date('2021-01-01'),
        finishedAt: null
      }],
    }]);
  }

  delete(t: Project): Observable<Project> {
    return of(t);
  }
}
