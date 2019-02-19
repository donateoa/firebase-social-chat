

import {Injectable} from '@angular/core';
import {of } from 'rxjs';
import {RestService} from 'src/app/services/rest.service';

import {IUser} from '../users/user.model';

@Injectable({providedIn: 'root'})
export class ProfileService extends RestService<IUser> {
  getUrl() {
    if (this.getAuthUser()) {
      return of (this.getAuthUser().getContacts());
    } else {
      return of (null);
    }
  }
}