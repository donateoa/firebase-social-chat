import 'firebase/auth';

import {Injectable} from '@angular/core';

import {RestService} from '../services/rest.service';

@Injectable()
export class UserPostsService extends RestService<any> {
  private _url;
  setUrl(url: String) { this._url = url; }
  getUrl() { return this._url; }
}
