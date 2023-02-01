import { Component, Input } from '@angular/core';
import { ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'form-errors',
  templateUrl: './form-errors.component.html',
})
export class FormErrorsComponent {

  @Input('errors') errors: any

  constructor() { }

}
