import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ModalController, NavParams} from '@ionic/angular';

import {Filter, IFilter, OperatorType} from './entity-filter.model';

export const atLeastOne = (validator: ValidatorFn) =>
    (group: FormGroup, ): ValidationErrors | null => {
      const hasAtLeastOne = group && group.controls &&
          Object.keys(group.controls).some(k => !validator(group.controls[k]));

      return hasAtLeastOne ? null : {
        atLeastOne: true,
      };
    };

@Component({
  selector: 'app-entity-filter',
  templateUrl: './entity-filter.component.html',
  styleUrls: ['./entity-filter.component.scss']
})
export class EntityFilterComponent implements OnInit {
  OperatorType: OperatorType;
  validations_form: FormGroup;
  value_matching_field: FormGroup;

  operators = [
    {code: OperatorType.EQUAL, label: '== è pari a'},
    {code: OperatorType.GREATER, label: '== è maggiore di'},
    {code: OperatorType.GREATER_AND_INCLUDE, label: '== è maggiore ed include'},
    {code: OperatorType.MINOR, label: '== è minore di'},
    {code: OperatorType.MINOR_AND_INCLUDE, label: '== è minore ed include'},
  ];
  keys: any;

  constructor(
      public formBuilder: FormBuilder, private modalController: ModalController,
      private navParams: NavParams) {}

  ngOnInit() {
    this.value_matching_field = this.formBuilder.group(
        {
          value: [''],
          sort: [''],
        },
        {validator: atLeastOne(Validators.required)});

    this.validations_form = this.formBuilder.group({
      field: [null, [Validators.required]],
      operator: [''],
      value_matching_field: this.value_matching_field
    });
    this.setOperatorValidators();
    this.keys = this.navParams.data.keys;
    if (this.navParams.data.filter) {
      this.validations_form.get('field').setValue(
          this.navParams.data.filter.field);
      this.validations_form.get('operator')
          .setValue(this.navParams.data.filter.operator);
      this.value_matching_field.get('sort').setValue(
          this.navParams.data.filter.sort);
      this.value_matching_field.get('value').setValue(
          this.navParams.data.filter.value);
    }
  }
  setOperatorValidators() {
    const value = this.value_matching_field.get('value');
    const operator = this.validations_form.get('operator');

    value.valueChanges.subscribe(value => {
      if (value) {
        operator.setValidators([Validators.required]);
      } else {
        operator.setValidators(null);
      }
      operator.updateValueAndValidity();
    });
  }
  clear() { this.validations_form.reset(); }
  dismiss() { this.modalController.dismiss({'action': 'cancel'}) }
  apply() {
    const filter: IFilter = new Filter();
    filter.field = this.validations_form.get('field').value;
    filter.value = this.value_matching_field.get('value').value;
    filter.operator = this.validations_form.get('operator').value;
    filter.sort = this.value_matching_field.get('sort').value;
    this.modalController.dismiss({filter: filter})
  }
  validation_messages = {
    'campo': [{type: 'required', message: 'Scegliere un campo'}],
    'confirm_mobile_number': [{
      type: 'required',
      message: 'Conferma Numero di telefono è obbligatorio.'
    }],
    'matching_mobile_number': [{
      type: 'areEqual',
      message: 'Numero di telefono e conferma non coincidono.'
    }]
  };
}
