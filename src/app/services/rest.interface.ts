import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export abstract class RestInterface {
  abstract create(data: any): Observable<any>;

  abstract update(data: any): Observable<any>;

  abstract find(id: number|string): Observable<any>;

  abstract query(req?: any): Observable<any[]>;

  abstract delete (id: number|string): Observable<any>;
}