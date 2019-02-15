import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {EntityFilterControllerComponent} from '../entity-filter-controller/entity-filter-controller.component';

import {EntityFilterComponent} from './entity-filter.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [EntityFilterComponent, EntityFilterControllerComponent],
  entryComponents: [EntityFilterComponent],
  exports: [EntityFilterComponent, EntityFilterControllerComponent]
})
export class EntityFilterModule {
}
