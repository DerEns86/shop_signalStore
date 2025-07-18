import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserStore } from '../../auth.store';
import { UserRole } from '../../models/user.model';

@Component({
  selector: 'app-login',
  imports: [],
  providers: [],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly userStore = inject(UserStore);
  readonly router = inject(Router);

  readonly UserRole = UserRole;

  handleLogin(userRole: UserRole) {
    this.userStore.login(userRole);
    console.log(this.userStore.getUser());
    this.router.navigateByUrl('/');
  }
}
