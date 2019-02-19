import 'firebase/auth';

import {Injectable} from '@angular/core';
import {of } from 'rxjs';
import {RestService} from 'src/app/services/rest.service';

import {User} from '../users/user.model';


@Injectable()
export class ContactsService extends RestService<User> {
  getUrl() {
    if (this.getAuthUser()) {
      return this.getAuthUser().getContacts();
    } else {
      return null;
    }
  }
}
