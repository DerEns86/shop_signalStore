import { Component, inject } from '@angular/core';
import { UserStore } from '../../../../auth.store';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly userStore = inject(UserStore);
}
