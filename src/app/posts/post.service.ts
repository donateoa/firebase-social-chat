import 'firebase/auth';

import {Injectable} from '@angular/core';
import {IPost} from 'src/app/model/post.model';

import {RestService} from '../services/rest.service';

@Injectable()
export class PostService extends RestService<IPost> {
  getUrl = () => `posts`;
}
