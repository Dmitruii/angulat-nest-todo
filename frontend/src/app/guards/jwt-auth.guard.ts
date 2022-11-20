import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(): boolean {
        if (!localStorage.getItem('authToken')) {
            this.router.navigate(['signin']);
            return false
        }
        return true
    }

}