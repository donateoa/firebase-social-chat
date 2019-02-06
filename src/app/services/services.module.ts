import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AuthGuardService} from './auth-guard.service';
import {MeFacebookService} from './me-facebook.service';


@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthGuardService, MeFacebookService]
})
export class ServicesModule {
}
