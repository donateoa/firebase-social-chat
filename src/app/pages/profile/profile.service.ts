

import {Injectable} from '@angular/core';
import {of } from 'rxjs';
import {RestService} from 'src/app/services/rest.service';

import {IUser} from '../users/user.model';

@Injectable({providedIn: 'root'})
export class ProfileService extends RestService<IUser> {
  getUrl() {
    if (this.getAuthUser()) {
      return of (`contacts/${this.getAuthUser().email}/list`);
    } else {
      return of (null);
    }
  }
}