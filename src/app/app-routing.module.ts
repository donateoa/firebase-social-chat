import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {of } from 'rxjs';

import {Profile} from './model/profile.model';
import {ProfileService} from './pages/profile/profile.service';
import {IUser} from './pages/users/user.model';
import {UsersService} from './pages/users/users.service';
import {Principal} from './services/Principal';
import {AuthGuardService} from './services/auth-guard.service';

@Injectable({providedIn: 'root'})
export class UserResolve implements Resolve<IUser> {
  constructor(private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const uid = route.params['uid'] ? route.params['uid'] : null;
    if (uid) {
      return this.usersService.find(uid);
    }
    return of (null);
  }
}
@Injectable({providedIn: 'root'})
export class ResolveMe implements Resolve<IUser> {
  constructor(private principal: Principal) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return of (this.principal.identity())
  }
}

@Injectable({providedIn: 'root'})
export class ResolveMyProfile implements Resolve<Profile> {
  constructor(
      private profileService: ProfileService, private principal: Principal) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.profileService.find(this.principal.identity().uid);
  }
}
@Injectable({providedIn: 'root'})
export class ProfileResolve implements Resolve<Profile> {
  constructor(
      private profileService: ProfileService, private principal: Principal) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const uid = route.params['uid'] ? route.params['uid'] : null;
    if (uid) {
      return this.profileService.find(uid);
    }
    return of (null);
  }
}

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'}, {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
    canActivate: [AuthGuardService]
  },
  {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'}, {
    path: 'contacts',
    loadChildren: './pages/contacts/contacts.module#ContactsPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'users',
    canActivate: [AuthGuardService],
    loadChildren: './pages/users/users.module#UsersPageModule'
  },
  {
    path: 'myprofile',
    loadChildren: './pages/myprofile/myprofile.module#MyprofilePageModule',
    canActivate: [AuthGuardService],
    resolve: {profile: ResolveMyProfile, user: ResolveMe}
  },
  {
    path: 'profile/:uid',
    canActivate: [AuthGuardService],
    loadChildren: './pages/profile/profile.module#ProfilePageModule',
    resolve: {profile: ProfileResolve, user: UserResolve},
  },
  {
    path: 'notifications',
    canActivate: [AuthGuardService],
    loadChildren:
        './pages/notifications/notifications.module#NotificationsPageModule'
  },
  {
    path: 'chats',
    canActivate: [AuthGuardService],
    loadChildren: './pages/chats/chats.module#ChatsPageModule'
  },
  {
    path: 'chats/:uid',
    canActivate: [AuthGuardService],
    loadChildren: './pages/chat/chat.module#ChatPageModule',
    resolve: {user: UserResolve},
  },
  {
    path: 'upload/:uid',
    canActivate: [AuthGuardService],
    loadChildren: './pages/upload/upload.module#UploadPageModule',
    resolve: {user: UserResolve},
  },
  {
    path: 'media-detail',
    canActivate: [AuthGuardService],
    loadChildren:
        './pages/media-detail/media-detail.module#MediaDetailPageModule'
  }
];

@NgModule({imports: [RouterModule.forRoot(routes)], exports: [RouterModule]})
export class AppRoutingModule {
}
