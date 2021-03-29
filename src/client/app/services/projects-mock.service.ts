import {Injectable} from '@angular/core';
import {Project} from '../models/project';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsMockService {

  constructor() {
  }

  save(t: Project): Observable<Project> {
    t._id = 'asdfghjkl';
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
        _id: 'asdfghjkl',
        description: 'First Task',
        createdAt: new Date('2021-01-01'),
        finishedAt: null
      }, {
        _id: 'asdfghjkl',
        description: 'Second Task',
        createdAt: new Date('2021-01-01'),
        finishedAt: new Date('2021-01-01')
      }],
    }, {
      id: 'asdfghjkl',
      name: 'Test Project 1',
      tasks: [{
        _id: 'asdfghjkl',
        description: 'First Task',
        createdAt: new Date('2021-01-01'),
        finishedAt: null
      }],
    }]);
  }

  delete(t: Project): Observable<any> {
    return of({});
  }
}
