import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalController} from '@ionic/angular';

import {EntityFilterComponent} from '../entity-filter/entity-filter.component';
import {IFilter} from '../entity-filter/entity-filter.model';

@Component({
  selector: 'app-entity-filter-controller',
  templateUrl: './entity-filter-controller.component.html',
  styleUrls: ['./entity-filter-controller.component.scss']
})
export class EntityFilterControllerComponent {
  data: any;
  @Output() changeList: EventEmitter<any> = new EventEmitter();
  _keys: any;
  _filter: IFilter;
  @Input()
  set keys(keys: any) { this._keys = keys; }
  get keys(){return this._keys};
  @Input()
  set filter(filter: IFilter) { this._filter = filter; }
  get filter(){return this._filter};
  @Input() color: string = 'primary';
  @Input() text: string;
  @Input() fill: string = 'clear';
  constructor(public modalController: ModalController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: EntityFilterComponent,
      componentProps: {
        'keys': this.keys,
        'filter': this.filter,
      }
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    this.data = data;
    this.changeList.emit(data);
  }
}
