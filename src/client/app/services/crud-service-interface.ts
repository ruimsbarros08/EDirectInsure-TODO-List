import {Observable} from 'rxjs';

export interface CrudServiceInterface<T> {
  save(t: T): Observable<T>;

  update(t: T): Observable<T>;

  findAll(): Observable<T[]>;

  delete(t: T): Observable<T>;
}
