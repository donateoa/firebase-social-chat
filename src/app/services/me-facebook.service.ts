import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {FacebookService, UIResponse} from 'ngx-facebook';
import {environment} from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class MeFacebookService {
  me: any;
  constructor(
      private angularFireAuth: AngularFireAuth, private fb: FacebookService) {}
  getMe() { return this.me; }

  async login() {
    this.fb.init(environment.facebook_config);
    const that = this;
    const provider = new firebase.auth.FacebookAuthProvider();
    const result = await this.angularFireAuth.auth.signInWithPopup(provider);
    const accessToken = result.credential.accessToken;
    this.me = {accessToken: accessToken};
    that.fb.api(`/me?access_token=${accessToken}`)
        .then((res: UIResponse) => Object.assign(this.me, res))
        .then(() => console.log(this.me))
        .catch((e: any) => console.error(e));
  }
}
