import { ToastService } from '../../services/toast.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'global-errors',
  templateUrl: './global-errors.component.html',
})
export class GlobalErrorsComponent {

  constructor(public toastService: ToastService) { }

}
