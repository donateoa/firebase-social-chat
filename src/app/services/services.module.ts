import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AuthGuardService} from './auth-guard.service';
import {ToastService} from './toast.service';


@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthGuardService, ToastService]
})
export class ServicesModule {
}
