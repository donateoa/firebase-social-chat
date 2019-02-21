

import {Injectable} from '@angular/core';
import {Profile} from 'src/app/model/profile.model';
import {RestService} from 'src/app/services/rest.service';

@Injectable({providedIn: 'root'})
export class ProfileService extends RestService<Profile> {
  getUrl() { return 'profile' }
}