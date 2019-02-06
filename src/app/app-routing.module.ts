import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';

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
  { path: 'users', loadChildren: './pages/users/users.module#UsersPageModule' }
];

@NgModule({imports: [RouterModule.forRoot(routes)], exports: [RouterModule]})
export class AppRoutingModule {
}
