import 'firebase/auth';

import {Injectable} from '@angular/core';
import {of } from 'rxjs';
import {RestService} from 'src/app/services/rest.service';
import {INotification} from './notifications.model';


@Injectable()
export class NotificationsService extends RestService<INotification> {
  getUrl() {
    if (this.getAuthUser()) {
      return of (this.getAuthUser().getContactNotificationsList());
    } else {
      return of (null);
    }
  }
}
