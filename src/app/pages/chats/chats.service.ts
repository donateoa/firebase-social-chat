import 'firebase/auth';

import {Injectable} from '@angular/core';
import {of } from 'rxjs';
import {RestService} from 'src/app/services/rest.service';

import {IUser} from '../users/user.model';


@Injectable()
export class ChatService extends RestService<IUser> {
  getUrl() {
    if (this.getAuthUser()) {
      return this.getAuthUser().getChats();
    } else {
      return null;
    }
  }
}
