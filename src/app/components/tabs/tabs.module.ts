import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {TabsComponent} from './tabs.component';

@NgModule({
  declarations: [TabsComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [TabsComponent]
})
export class TabsModule {
}
