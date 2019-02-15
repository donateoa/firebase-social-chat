import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IFilter} from '../components/entity-filter/entity-filter.model';

@Injectable()
export abstract class RestInterface {
  abstract create(data: any): Observable<any>;

  abstract update(data: any): Observable<any>;

  abstract find(id: number|string): Observable<any>;

  abstract query(next?: boolean, filter?: IFilter): Observable<any[]>;

  abstract delete (id: number|string): Observable<any>;
}