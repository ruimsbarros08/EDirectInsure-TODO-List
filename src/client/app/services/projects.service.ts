import {Injectable} from '@angular/core';
import {Project} from '../models/project';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) {
  }

  save(project: Project): Observable<Project> {
    return this.httpClient.post<Project>(`${environment.api}/projects`, project);
  }

  update(project: Project): Observable<Project> {
    return this.httpClient.put<Project>(`${environment.api}/projects/${project._id}`, project);
  }

  findAll(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${environment.api}/projects`);
  }

  delete(project: Project): Observable<any> {
    return this.httpClient.delete<any>(`${environment.api}/projects/${project._id}`);
  }
}
