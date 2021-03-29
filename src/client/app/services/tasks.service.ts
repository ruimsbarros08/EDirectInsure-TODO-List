import {Injectable} from '@angular/core';
import {Task} from '../models/task';
import {Observable} from 'rxjs';
import {Project} from '../models/project';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient) {
  }

  save(project: Project, task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${environment.api}/projects/${project._id}/tasks`, task);
  }

  update(project: Project, task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${environment.api}/projects/${project._id}/tasks/${task._id}`, task);
  }

  delete(project: Project, task: Task): Observable<any> {
    return this.httpClient.delete<any>(`${environment.api}/projects/${project._id}/tasks/${task._id}`);
  }
}
