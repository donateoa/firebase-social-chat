import 'firebase/auth';

import {Inject, Injectable} from '@angular/core';
import {of } from 'rxjs';
import {Post} from 'src/app/model/post.model';
import {RestService} from 'src/app/services/rest.service';



@Injectable()
export class BachecaService extends RestService<Post> {
  getUrl() {
    if (this.getAuthUser()) {
      return this.getAuthUser().getBacheca();
    } else {
      return null;
    }
  }
}
