import 'firebase/auth';

import {Inject, Injectable} from '@angular/core';
import {of } from 'rxjs';

import {RestService} from '../services/rest.service';

import {IPost} from './post.model';

@Injectable()
export class UserPostsService extends RestService<any> {
  getUrl() {
    if (this.getAuthUser()) {
      return of (this.getAuthUser().getUserPosts());
    } else {
      return of (null);
    }
  }
}
