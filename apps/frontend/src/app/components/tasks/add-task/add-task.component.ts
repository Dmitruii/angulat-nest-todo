import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent implements OnInit {

  isAddTaskForm = false
  form = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  }

  open() {
    this.isAddTaskForm = true
  }

  close() {
    this.isAddTaskForm = false
  }

  get name() {
    return this.form.controls.name
  }

  onSubmit() {
    this.form.markAllAsTouched()
  }

}
