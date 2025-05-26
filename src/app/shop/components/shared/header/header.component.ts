import { Component, inject } from '@angular/core';
import { UserStore } from '../../../../auth.store';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly userStore = inject(UserStore);
  readonly router = inject(Router);

  handleLogout() {
    this.userStore.logout();
    console.log(this.userStore.getUser());

    this.router.navigateByUrl('/');
  }

  handleLogin() {
    this.router.navigateByUrl('/login');
  }
}
