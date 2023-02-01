import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'signup-page',
  templateUrl: './signup.component.html',
})
export class SignUpPage {

  isLoading = false

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(4), Validators.required]),
    name: new FormControl(null),
  });
  
  constructor(private authService: AuthService,
    private toastService: ToastService,
    private router: Router) { 
      router.events.subscribe(() => this.toastService.clear());
    }

  onSubmit() {
    this.isLoading = true
    this.form.disable()

    this.authService.signup({
      email: this.email.value,
      password: this.password.value,
      name: this.name.value,
    }).pipe(
      finalize(() => {
        this.isLoading = false
        this.form.enable()
      })
    ).subscribe(({ token }) => {
      localStorage.setItem('authToken', token)
      this.toastService.handle({type: 'success', title: 'Success!'})
      this.router.navigate(['tasks'])
    })
  }

  get isValidForm(): boolean {
    return this.form.status === 'VALID'
  }

  get email(): FormControl {
    return this.form.controls.email as FormControl
  }
  get password(): FormControl {
    return this.form.controls.password as FormControl
  }
  get name(): FormControl {
    return this.form.controls.name as FormControl
  }

}
