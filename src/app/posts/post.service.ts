import 'firebase/auth';

import {Injectable} from '@angular/core';
import {of } from 'rxjs';

import {RestService} from '../services/rest.service';

import {IPost} from './post.model';

@Injectable()
export class PostService extends RestService<IPost> {
  getUrl() { return of (`posts`); }
}
