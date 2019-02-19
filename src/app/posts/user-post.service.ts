import 'firebase/auth';

import {Injectable} from '@angular/core';

import {RestService} from '../services/rest.service';

@Injectable()
export class UserPostsService extends RestService<any> {
  getUrl() {
    if (this.getAuthUser()) {
      return this.getAuthUser().getUserPosts();
    } else {
      return null;
    }
  }
}
