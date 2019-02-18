import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {SearchComponent} from './search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, IonicModule],
  exports: [SearchComponent],
})
export class SearchModule {
}
