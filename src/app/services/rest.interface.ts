import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IFilter} from '../components/entity-filter/entity-filter.model';

@Injectable()
export abstract class RestInterface<T> {
  abstract create(data: T): Observable<T>;

  abstract update(data: T): Observable<T>;

  abstract find(id: number|string): Observable<T>;

  abstract query(next?: boolean, filter?: IFilter): Observable<T[]>;

  abstract delete (id: number|string): Observable<T>;
}