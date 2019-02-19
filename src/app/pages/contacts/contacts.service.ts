import 'firebase/auth';

import {Injectable} from '@angular/core';
import {of } from 'rxjs';
import {RestService} from 'src/app/services/rest.service';

import {IUser} from '../users/user.model';


@Injectable()
export class ContactsService extends RestService<IUser> {
  getUrl() {
    if (this.getAuthUser()) {
      return of (`contacts/${this.getAuthUser().email}/list`);
    } else {
      return of (null);
    }
  }
}
