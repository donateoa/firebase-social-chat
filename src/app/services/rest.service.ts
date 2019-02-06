import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {RestInterface} from 'src/app/services/rest.interface';

@Injectable({providedIn: 'root'})
export class RestService implements RestInterface {
  constructor(private angularFireAuth: AngularFireAuth) {}

  create(data: any): Observable<any> { return null; }

  update(data: any): Observable<any> { return null; }

  find(id: number|string): Observable<any> { return null; }

  query(req?: any): Observable<any[]> { return null; }

  delete (id: number|string): Observable<any> { return null; }
}
