import 'firebase/auth';

import {Inject, Injectable} from '@angular/core';
import {of } from 'rxjs';
import {RestService} from 'src/app/services/rest.service';



@Injectable()
export class BachecaService extends RestService<any> {
  getUrl() {
    if (this.getAuthUser()) {
      return of (this.getAuthUser().getBacheca());
    } else {
      return of (null);
    }
  }
}
