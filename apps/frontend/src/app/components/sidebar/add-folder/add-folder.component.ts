import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
})
export class AddFolderComponent implements OnInit {

  isOpenModal = false
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    color: new FormControl(''),
  });

  ngOnInit(): void {}

  openModal() {
    this.isOpenModal = true
  }

  closeModal() {
    this.isOpenModal = false
  }

  onSubmit() {
    this.form.markAllAsTouched()
  }

  get name() {
    return this.form.controls.name
  }

}
