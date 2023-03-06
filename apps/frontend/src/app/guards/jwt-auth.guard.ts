import { ToastService } from './../services/toast.service';
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private router: Router,
        private toastService: ToastService) {}

    canActivate(): boolean {
        if (!localStorage.getItem('authToken')) {
            this.router.navigate(['/']);
            return false
        }
        return true
    }

}