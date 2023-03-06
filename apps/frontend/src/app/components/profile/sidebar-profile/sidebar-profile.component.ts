import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-profile',
  templateUrl: './sidebar-profile.component.html',
})
export class SidebarProfileComponent {

  isLoading = false

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  logout() {
    this.isLoading = true
    this.authService.logout().pipe(
      finalize(() => {
        this.isLoading = false
      })
    ).subscribe(() => this.router.navigateByUrl('/'))
  }

}
